import { Suspense } from "react";
import SearchClient from "./search-client";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <section className="relative min-h-screen flex flex-col pt-24 px-4 glass overflow-hidden">
          <div className="max-w-4xl w-full mx-auto">
          <h1 className="font-heading text-3xl font-bold mb-6 text-foreground">
            Search Questions
          </h1>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
          </div>
        </section>
      }
    >
      <SearchClient />
    </Suspense>
  );
}

