import { db } from "@/lib/db";
import { inngest } from "@/lib/services/inngest";
import { questions, user as userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

type AnswerCreatedEventData = {
  questionId: number;
  userId: string;
  answerType: "ai" | "user" | string;
};

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY not configured - emails will not be sent");
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
};

export const sendAnswerNotification = inngest.createFunction(
  {
    id: "send-answer-notification",
    name: "Notify User of New Answer",
    triggers: {
      event: "answer.created",
    },
  },
  async ({ event, step }) => {
    const { questionId, userId, answerType } =
      event.data as AnswerCreatedEventData;

    // Step 1: Get question and user details
    const details = await step.run("fetch-details", async () => {
      const question = await db.query.questions.findFirst({
        where: eq(questions.id, questionId),
      });

      const user = await db.query.user.findFirst({
        where: eq(userTable.id, userId),
      });

      return {
        question,
        user,
      };
    });

    if (!details.question || !details.user) {
      return {
        success: false,
        reason: "Question or user not found",
      };
    }

    const question = details.question;
    const user = details.user;

    // Step 2: Send email notification
    const emailSent = await step.run("send-email", async () => {
      const resend = getResendClient();

      if (!resend) {
        console.log(
          "📧 Skipping answer notification email - Resend not configured"
        );
        return false;
      }

      if (!user.email) {
        console.log("📧 Skipping answer notification email - user email missing");
        return false;
      }

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const isAiAnswer = answerType === "ai";

      await resend.emails.send({
        from: "DevQuery Forum <notifications@resend.dev>",
        to: user.email,
        subject: `New ${isAiAnswer ? "AI " : ""}Answer on Your Question`,
        html: `
          <h2>New Answer on Your Question</h2>
          <p>Hi ${user.name || "there"},</p>
          <p>
            Your question 
            <strong>"${question.title}"</strong> 
            received a new ${isAiAnswer ? "AI-generated" : ""} answer.
          </p>
          <p>
            <a href="${appUrl}/questions/${questionId}">
              View Answer
            </a>
          </p>
        `,
      });

      return true;
    });

    return {
      success: true,
      emailSent,
    };
  }
);