import { requireAuth } from "@/lib/auth/middleware";
import { db } from "@/lib/db";
import { answers, answerVotes, userProfile } from "@/lib/db/schema";
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
    const answerId = parseInt(id);

    if (Number.isNaN(answerId)) {
      return NextResponse.json(
        { success: false, error: "Invalid answer id" },
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

    const existingVote = await db.query.answerVotes.findFirst({
      where: and(
        eq(answerVotes.answerId, answerId),
        eq(answerVotes.userId, userId)
      ),
    });

    const answer = await db.query.answers.findFirst({
      where: eq(answers.id, answerId),
    });

    if (!answer) {
      return NextResponse.json(
        { success: false, error: "Answer not found" },
        { status: 404 }
      );
    }

    if (answer.authorId === userId) {
      return NextResponse.json(
        { success: false, error: "Cannot vote on your own answer" },
        { status: 400 }
      );
    }

    await db.transaction(async (tx) => {
      if (existingVote) {
        if (existingVote.voteType === voteType) {
          // Same vote clicked again = remove vote
          const voteChange = voteType === "upvote" ? -1 : 1;
          const repChange = voteType === "upvote" ? -10 : 2;

          await tx
            .delete(answerVotes)
            .where(
              and(
                eq(answerVotes.answerId, answerId),
                eq(answerVotes.userId, userId)
              )
            );

          await tx
            .update(answers)
            .set({
              votes: sql`${answers.votes} + ${voteChange}`,
            })
            .where(eq(answers.id, answerId));

          if (answer.authorId) {
            await tx
              .update(userProfile)
              .set({
                reputation: sql`${userProfile.reputation} + ${repChange}`,
              })
              .where(eq(userProfile.userId, answer.authorId));
          }
        } else {
          // Changed vote: upvote -> downvote or downvote -> upvote
          const voteChange = voteType === "upvote" ? 2 : -2;
          const repChange = voteType === "upvote" ? 12 : -12;

          await tx
            .update(answerVotes)
            .set({
              voteType,
            })
            .where(
              and(
                eq(answerVotes.answerId, answerId),
                eq(answerVotes.userId, userId)
              )
            );

          await tx
            .update(answers)
            .set({
              votes: sql`${answers.votes} + ${voteChange}`,
            })
            .where(eq(answers.id, answerId));

          if (answer.authorId) {
            await tx
              .update(userProfile)
              .set({
                reputation: sql`${userProfile.reputation} + ${repChange}`,
              })
              .where(eq(userProfile.userId, answer.authorId));
          }
        }
      } else {
        // New vote
        const voteChange = voteType === "upvote" ? 1 : -1;
        const repChange = voteType === "upvote" ? 10 : -2;

        await tx.insert(answerVotes).values({
          answerId,
          userId,
          voteType,
        });

        await tx
          .update(answers)
          .set({
            votes: sql`${answers.votes} + ${voteChange}`,
          })
          .where(eq(answers.id, answerId));

        if (answer.authorId) {
          await tx
            .update(userProfile)
            .set({
              reputation: sql`${userProfile.reputation} + ${repChange}`,
            })
            .where(eq(userProfile.userId, answer.authorId));
        }
      }
    });

    const updatedAnswer = await db.query.answers.findFirst({
      where: eq(answers.id, answerId),
    });

    const currentUserVote = await db.query.answerVotes.findFirst({
      where: and(
        eq(answerVotes.answerId, answerId),
        eq(answerVotes.userId, userId)
      ),
    });

    return NextResponse.json({
      success: true,
      message: "Vote recorded",
      votes: updatedAnswer?.votes || 0,
      userVote: currentUserVote?.voteType || null,
    });
  } catch (error) {
    console.error("Error voting on answer:", error);
    return NextResponse.json(
      { success: false, error: "Failed to vote" },
      { status: 500 }
    );
  }
}