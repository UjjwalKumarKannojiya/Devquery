import { requireAuth } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { questions, questionVotes, userProfile } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request);
    if (authResult.error) return authResult.error;

    const { userId } = authResult;

    const { id } = await params;
    const questionId = parseInt(id);

    if (Number.isNaN(questionId)) {
      return NextResponse.json(
        { success: false, error: "Invalid question id" },
        { status: 400 }
      );
    }

    const { voteType } = (await request.json()) as {
      voteType?: string;
    };

    if (voteType !== "upvote" && voteType !== "downvote") {
      return NextResponse.json(
        { success: false, error: "Invalid vote type" },
        { status: 400 }
      );
    }

    const existingVote = await db.query.questionVotes.findFirst({
      where: and(
        eq(questionVotes.questionId, questionId),
        eq(questionVotes.userId, userId)
      ),
    });

    const question = await db.query.questions.findFirst({
      where: eq(questions.id, questionId),
    });

    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }

    if (question.authorId === userId) {
      return NextResponse.json(
        { success: false, error: "Cannot vote on your own question" },
        { status: 400 }
      );
    }

    await db.transaction(async (tx) => {
      if (existingVote) {
        if (existingVote.voteType === voteType) {
          // Same vote clicked again = remove vote
          const voteChange = voteType === "upvote" ? -1 : 1;
          const repChange = voteType === "upvote" ? -5 : 2;

          await tx
            .delete(questionVotes)
            .where(
              and(
                eq(questionVotes.questionId, questionId),
                eq(questionVotes.userId, userId)
              )
            );

          await tx
            .update(questions)
            .set({
              votes: sql`${questions.votes} + ${voteChange}`,
            })
            .where(eq(questions.id, questionId));

          if (question.authorId) {
            await tx
              .update(userProfile)
              .set({
                reputation: sql`${userProfile.reputation} + ${repChange}`,
              })
              .where(eq(userProfile.userId, question.authorId));
          }
        } else {
          // Changed vote: upvote -> downvote or downvote -> upvote
          const voteChange = voteType === "upvote" ? 2 : -2;
          const repChange = voteType === "upvote" ? 7 : -7;

          await tx
            .update(questionVotes)
            .set({
              voteType,
            })
            .where(
              and(
                eq(questionVotes.questionId, questionId),
                eq(questionVotes.userId, userId)
              )
            );

          await tx
            .update(questions)
            .set({
              votes: sql`${questions.votes} + ${voteChange}`,
            })
            .where(eq(questions.id, questionId));

          if (question.authorId) {
            await tx
              .update(userProfile)
              .set({
                reputation: sql`${userProfile.reputation} + ${repChange}`,
              })
              .where(eq(userProfile.userId, question.authorId));
          }
        }
      } else {
        // New vote
        const voteChange = voteType === "upvote" ? 1 : -1;
        const repChange = voteType === "upvote" ? 5 : -2;

        await tx.insert(questionVotes).values({
          questionId,
          userId,
          voteType,
        });

        await tx
          .update(questions)
          .set({
            votes: sql`${questions.votes} + ${voteChange}`,
          })
          .where(eq(questions.id, questionId));

        if (question.authorId) {
          await tx
            .update(userProfile)
            .set({
              reputation: sql`${userProfile.reputation} + ${repChange}`,
            })
            .where(eq(userProfile.userId, question.authorId));
        }
      }
    });

    const updatedQuestion = await db.query.questions.findFirst({
      where: eq(questions.id, questionId),
    });

    const currentUserVote = await db.query.questionVotes.findFirst({
      where: and(
        eq(questionVotes.questionId, questionId),
        eq(questionVotes.userId, userId)
      ),
    });

    return NextResponse.json({
      success: true,
      message: "Vote recorded",
      votes: updatedQuestion?.votes || 0,
      userVote: currentUserVote?.voteType || null,
    });
  } catch (error) {
    console.error("Error voting on question:", error);
    return NextResponse.json(
      { success: false, error: "Failed to vote" },
      { status: 500 }
    );
  }
}