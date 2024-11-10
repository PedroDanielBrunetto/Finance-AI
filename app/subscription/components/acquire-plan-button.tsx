"use client";
import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not set");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) {
      throw new Error("Stripe not loaded");
    }
    await stripe.redirectToCheckout({ sessionId });
  };
  return (
    <div className="p-4">
      <Button
        className="w-full rounded-full font-bold"
        onClick={handleAcquirePlanClick}
      >
        Adquirir plano
      </Button>
    </div>
  );
};

export default AcquirePlanButton;
