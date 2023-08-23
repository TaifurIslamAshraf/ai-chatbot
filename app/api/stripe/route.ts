import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const settingsUrl = absoluteUrl("settings");

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user.id) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (userSubscription && userSubscription.stripeCustomarId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomarId,
        return_url: settingsUrl,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      mode: "subscription",
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      billing_address_collection: "auto",
      customer_email: session.user.email!,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Celebrity AI Pro",
              description: "Create Your won Chatbot",
            },
            unit_amount: 999,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1
        },
      ],
      metadata: {
        userId: session.user.id
      }
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log(error);
    return new NextResponse("internal error", { status: 501 });
  }
}
