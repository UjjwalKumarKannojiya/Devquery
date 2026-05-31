import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth/config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
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

    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1,
    });

    let customerId = customers.data[0]?.id;

    if (!customerId) {
      
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name || undefined,
        metadata: {
          userId: session.user.id,
        },
      });
      customerId = customer.id;
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/billing`,
    });

    return NextResponse.json({
      url: portalSession.url,
    });
  } catch (error) {
    console.error("Customer portal error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}

