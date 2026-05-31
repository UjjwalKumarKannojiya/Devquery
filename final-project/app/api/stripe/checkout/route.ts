import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth/config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { priceId } = await request.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/billing?status=success`,
      cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/billing?status=canceled`,
      metadata: {
        userId: session.user.id,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

