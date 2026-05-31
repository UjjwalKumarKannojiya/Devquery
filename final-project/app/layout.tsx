import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/CookieConsent";
import PostHogPageView from "@/components/posthog-pageview";
import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevQuery Forum - Get Instant AI-Powered Answers",
  description:
    "A modern Q&A platform where every question receives instant AI-generated answers, powered by GPT-4 Turbo. Join our community and start getting answers!",
  keywords: ["Q&A", "Questions", "Answers", "AI", "Community", "Forum", "Coding"],
  authors: [{ name: "DevQuery Team" }],
  creator: "DevQuery",
  publisher: "DevQuery",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://devquery-forum.com",
    title: "DevQuery Forum - Get Instant AI-Powered Answers",
    description:
      "Ask coding questions and get instant AI-powered answers from the community",
    images: [
      {
        url: "https://devquery-forum.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevQuery Forum",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevQuery Forum",
    description: "Instant AI-powered Q&A platform for developers",
    images: ["https://devquery-forum.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://devquery-forum.com" />
        <meta name="google-site-verification" content="your-verification-code" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DevQuery Forum",
              description:
                "A modern Q&A platform with AI-powered answers for developers",
              url: "https://devquery-forum.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://devquery-forum.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className="font-sans antialiased bg-background text-foreground"
        suppressHydrationWarning
      >
        <Providers>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <Header />
          <main className="px-4 sm:px-6 py-6 sm:py-8 glass">
            <div className="max-w-[1200px] mx-auto">{children}</div>
          </main>
          <Toaster />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}

