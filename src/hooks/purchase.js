import React, { useCallback } from 'react';
import { createCheckoutSession } from "next-stripe/client";
import { loadStripe } from "@stripe/stripe-js";
import { CartProvider, useCart } from "react-use-cart";

// export default function usePurchase({items}){ // { items } = useCart();

    const purchase = async (items)=>{
        console.log(items)
        const cartStripe = items.map( i => ({
            price: i.id,
            quantity: i.quantity || 0
          }));
    
        // delete all products with quantity <= 0
        const cartFiltered = cartStripe.filter( p => p.quantity > 0 );
        if(cartFiltered.length > 0) {
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
        } else {
            console.log(' El carrito esta vacio ');
        }
    }
    export default purchase;
    // },[items]);


    // return { purchase };
//   }