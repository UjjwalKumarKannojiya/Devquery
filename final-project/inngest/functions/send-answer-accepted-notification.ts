import { db } from "@/lib/db";
import { inngest } from "@/lib/services/inngest";
import { answers, questions, user as userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

type AnswerAcceptedEventData = {
  questionId: number;
  authorId: string;
  answerId: number;
};

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY not configured - emails will not be sent");
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
};

export const sendAnswerAcceptedNotification = inngest.createFunction(
  {
    id: "send-answer-accepted-notification",
    name: "Notify User Their Answer Was Accepted",
    triggers: {
      event: "answer.accepted",
    },
  },
  async ({ event, step }) => {
    const { questionId, authorId, answerId } =
      event.data as AnswerAcceptedEventData;

    const details = await step.run("fetch-details", async () => {
      const question = await db.query.questions.findFirst({
        where: eq(questions.id, questionId),
      });

      const answer = await db.query.answers.findFirst({
        where: eq(answers.id, answerId),
      });

      const user = await db.query.user.findFirst({
        where: eq(userTable.id, authorId),
      });

      return {
        question,
        answer,
        user,
      };
    });

    if (!details.question || !details.user || !details.answer) {
      return {
        success: false,
        reason: "Question, answer, or user not found",
      };
    }

    const question = details.question;
    const user = details.user;

    const emailSent = await step.run("send-email", async () => {
      const resend = getResendClient();

      if (!resend) {
        console.log("📧 Skipping answer accepted email - Resend not configured");
        return false;
      }

      if (!user.email) {
        console.log("📧 Skipping answer accepted email - user email missing");
        return false;
      }

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      await resend.emails.send({
        from: "DevQuery Forum <notifications@resend.dev>",
        to: user.email,
        subject: "Your Answer Was Accepted!",
        html: `
          <h2>Congratulations! Your Answer Was Accepted</h2>
          <p>Hi ${user.name || "there"},</p>
          <p>
            Your answer to the question 
            <strong>"${question.title}"</strong> 
            was marked as the accepted answer!
          </p>
          <p>You earned <strong>+15 reputation points</strong> for this achievement.</p>
          <p>
            <a href="${appUrl}/questions/${questionId}#answer-${answerId}">
              View Your Answer
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