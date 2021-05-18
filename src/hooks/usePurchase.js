import React, { useCallback } from 'react';
import { createCheckoutSession } from "next-stripe/client";
import { loadStripe } from "@stripe/stripe-js";

export default function usePurchase(){

    const items = []
    // const { items } = useCart();
  
    const purchase = useCallback( async ()=>{
        const cartFiltered = [{ price: 'price_1HHAiHDacTuHZSBKCkWa5Bui', quantity: 1}];

        const session = await createCheckoutSession({
            success_url: window.location.href,
            cancel_url: window.location.href,
            line_items: cartFiltered,
            payment_method_types: ["card"],
            mode: "payment",
        });
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
        if (stripe) {
            stripe.redirectToCheckout({ sessionId: session.id });
        }

    },[]);
    return { purchase };
  }