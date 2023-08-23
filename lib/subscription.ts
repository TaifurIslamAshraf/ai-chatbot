import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import db from "./db";

const dayInMs = 86_400_000;

export const checkSubscription = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return false;
  }

  const userSubsription = await db.userSubscription.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomarId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!userSubsription) {
    return false;
  }

  const isValid = 
    userSubsription.stripePriceId &&
    userSubsription.stripeCurrentPeriodEnd?.getTime()! + dayInMs > Date.now()

    return !!isValid
};
