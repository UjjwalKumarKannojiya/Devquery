"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/client";
import { useState } from "react";
import { toast } from "sonner";

export default function BillingPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (!isPending && !session?.user) {
    router.push("/auth/signin?redirect=/billing");
    return null;
  }

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/customer-portal", {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to access billing portal");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to access billing portal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async (priceId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      if (sessionId) {
        const baseUrl = "https://checkout.stripe.com/pay";
        window.location.href = `${baseUrl}/${sessionId}`;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to start checkout"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for getting started",
      price: "$0",
      priceId: null,
      features: [
        "Ask unlimited questions",
        "AI-powered answers",
        "Community support",
        "Public profile",
      ],
      cta: "Current Plan",
      popular: false,
    },
    {
      name: "Professional",
      description: "For power users and professionals",
      price: "$9.99",
      period: "/month",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID || "price_pro",
      features: [
        "Everything in Starter",
        "Priority AI responses",
        "Advanced analytics",
        "Private questions",
        "Email support",
        "Custom tags",
      ],
      cta: "Upgrade Now",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: "Custom",
      priceId: null,
      features: [
        "Everything in Professional",
        "Team management",
        "API access",
        "Dedicated support",
        "SLA guarantee",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-4xl font-heading font-bold mb-2">Billing & Subscription</h1>
        <p className="text-muted-foreground text-lg">
          Manage your subscription and billing information
        </p>
      </div>

      {}
      {session?.user && (
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{session.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{session.user.name || "Not set"}</p>
              </div>
              <div className="pt-4">
                <Button
                  onClick={handleManageSubscription}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Manage Subscription"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold mb-6">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`glass-card flex flex-col relative ${
                plan.popular ? "ring-2 ring-primary md:scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="text-primary mr-3">✓</span>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  onClick={() => {
                    if (plan.priceId) {
                      handleCheckout(plan.priceId);
                    } else if (plan.name === "Enterprise") {
                      window.location.href = "mailto:sales@devquery.forum";
                    }
                  }}
                  disabled={isLoading || plan.name === "Starter"}
                  variant={plan.popular ? "default" : "outline"}
                  className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                >
                  {isLoading && plan.priceId ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.cta
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Can I cancel my subscription anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can cancel your subscription anytime from the customer portal. Your access will continue until the end of your billing period.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards (Visa, Mastercard, American Express) through Stripe.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do you offer a free trial?</h3>
            <p className="text-sm text-muted-foreground">
              The Starter plan is completely free and includes AI-powered answers and community support.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How do I access my invoices?</h3>
            <p className="text-sm text-muted-foreground">
              You can view and download all your invoices from the customer portal under the &quot;Invoices&quot; section.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

