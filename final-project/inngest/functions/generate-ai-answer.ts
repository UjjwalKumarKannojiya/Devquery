import { apiRequest } from "@/lib/api";
import { db } from "@/lib/db";
import { inngest } from "@/lib/services/inngest";
import { answers, questions, questionTags, tags } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

type QuestionCreatedEventData = {
  questionId: number;
  title: string;
  body: string;
  images?: string[];
  authorId: string | number;
};

type VisionMessageContent =
  | string
  | Array<
      | { type: "text"; text: string }
      | { type: "image_url"; image_url: { url: string } }
    >;

export const generateAIAnswer = inngest.createFunction(
  {
    id: "generate-ai-answer",
    name: "Generate AI Answer for Question",
    triggers: {
      event: "question.created",
    },
    concurrency: {
      limit: 10,
    },
  },
  async ({ event, step }) => {
    const { questionId, title, body, images, authorId } =
      event.data as QuestionCreatedEventData;

    // Step 1: Generate presigned URLs for images if they exist
    const imageUrls = await step.run("generate-image-urls", async () => {
      if (!images || images.length === 0) {
        return [];
      }

      const urls: string[] = [];

      for (const imageKey of images) {
        try {
          const result = await apiRequest("/api/upload/image-url", {
            method: "POST",
            body: JSON.stringify({ key: imageKey }),
          });

          urls.push((result as { url: string }).url);
        } catch (error) {
          console.error(
            "Error generating presigned URL for image:",
            imageKey,
            error
          );
        }
      }

      return urls;
    });

    // Step 2: AI Tag Generation
    const tagsResult = await step.ai.infer("generate-tags", {
      model: step.ai.models.openai({
        model: "gpt-5-mini",
      }),
      body: {
        messages: [
          {
            role: "system",
            content:
              'You are a tag generator for a Q&A platform. Return ONLY a JSON array of 3-5 relevant tags lowercase and hyphenated. Focus on programming languages, frameworks, technologies, and concepts. Example: ["react", "javascript", "hooks"]',
          },
          {
            role: "user",
            content: `Question Title: ${title}\n\nQuestion Body: ${body}`,
          },
        ],
      },
    });

    let generatedTags: string[] = [];

    try {
      let content = tagsResult.choices[0].message.content || "[]";

      content = content
        .replace(/^```(?:json)?\s*\n?/gm, "")
        .replace(/\n?```$/gm, "")
        .trim();

      const parsed = JSON.parse(content);

      if (Array.isArray(parsed)) {
        generatedTags = parsed
          .map((tag) => String(tag).toLowerCase().trim())
          .filter(Boolean);
      } else {
        console.warn("Expected array of tags, got:", typeof parsed);
        generatedTags = [];
      }
    } catch (error) {
      console.error(
        "Failed to parse tags:",
        error,
        "Content:",
        tagsResult.choices[0].message.content
      );
      generatedTags = [];
    }

    // Remove duplicate tags
    generatedTags = Array.from(new Set(generatedTags));

    // Step 3: AI Answer Generation with Vision Support
    const userMessageContent: VisionMessageContent =
      imageUrls && imageUrls.length > 0
        ? [
            {
              type: "text",
              text: `${title}\n\n${body}`,
            },
            ...imageUrls.map((url) => ({
              type: "image_url" as const,
              image_url: { url },
            })),
          ]
        : `${title}\n\n${body}`;

    const answerResult = await step.ai.infer("generate-answer", {
      model: step.ai.models.openai({
        model: "gpt-5",
      }),
      body: {
        messages: [
          {
            role: "system",
            content: `You are an expert programming assistant on a Q&A platform similar to Stack Overflow. Provide accurate, helpful, and well-structured answers.

Include:
- Clear explanation
- Code examples with proper formatting
- Best practices
- Potential pitfalls to avoid
${
  imageUrls && imageUrls.length > 0
    ? "- Analyze any provided images and reference them in your answer"
    : ""
}

Format your answer in Markdown.`,
          },
          {
            role: "user",
            content: userMessageContent as any,
          },
        ],
      },
    });

    const aiAnswerContent =
      answerResult.choices[0].message.content ||
      "AI could not generate an answer for this question.";

    // Step 4: Save to Database
    await step.run("save-to-database", async () => {
      const tagIds: number[] = [];

      for (const tagName of generatedTags) {
        const slug = tagName;

        const [tag] = await db
          .insert(tags)
          .values({
            name: tagName,
            slug,
            usageCount: 1,
          })
          .onConflictDoUpdate({
            target: tags.slug,
            set: {
              usageCount: sql`${tags.usageCount} + 1`,
            },
          })
          .returning();

        if (tag?.id) {
          tagIds.push(tag.id);
        }
      }

      if (tagIds.length > 0) {
        await db
          .insert(questionTags)
          .values(
            tagIds.map((tagId) => ({
              questionId,
              tagId,
            }))
          )
          .onConflictDoNothing();
      }

      await db
        .update(questions)
        .set({
          aiAnswerGenerated: true,
        })
        .where(eq(questions.id, questionId));

      await db.insert(answers).values({
        questionId,
        content: aiAnswerContent,
        isAiGenerated: true,
        authorId: null,
      });
    });

    // Step 5: Notify User
    await step.run("send-notification", async () => {
      await inngest.send({
        name: "answer.created",
        data: {
          questionId,
          userId: authorId,
          answerType: "ai",
        },
      });
    });

    return {
      success: true,
      questionId,
      tagsGenerated: generatedTags,
      answerLength: aiAnswerContent.length,
    };
  }
);