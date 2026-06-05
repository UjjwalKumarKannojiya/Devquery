import { Button } from "@/components/ui/button";
import { Bot, Tags, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center text-center py-20 md:py-32 overflow-hidden">
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          <span className="glow-text">Instant AI-Powered</span> Answers
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Ask any coding question and receive instant AI-generated answers
          powered by GPT-5, plus insights from the community
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/questions/ask">
            <Button className="glow-button">
              Ask a Question
            </Button>
          </Link>
          <Link href="/questions">
            <Button variant="outline" className="border-border hover:bg-accent rounded-lg text-base">
              Browse Questions
            </Button>
          </Link>
        </div>
      </div>


      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <div className="surface p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Bot className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Instant AI Answers
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Every question gets an AI-generated answer within seconds using
            GPT-5
          </p>
        </div>

        <div className="surface p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Tags className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Auto-Tagging
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Questions are automatically tagged and categorized by AI
          </p>
        </div>

        <div className="surface p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">
              Community Answers
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Get additional insights from experienced developers
          </p>
        </div>
      </div>
    </>
  );
}

