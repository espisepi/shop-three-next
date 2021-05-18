import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { useCallback } from 'react';
// import { createCheckoutSession } from "next-stripe/client";
import usePurchase from '@/hooks/usePurchase';

const Scene = dynamic(() => import('@/scenes/Scene'), {
  ssr: false,
})

// const usePurchase = dynamic(() => import('@/hooks/usePurchase'), {
//   ssr: false,
// });

export default function Page({ title }) {

  useStore.setState({ title })

  const { purchase } = usePurchase();

  return (
    <>
      {/* <h1>HOla mundo</h1> */}
      <Scene r3f purchase={purchase} />
    </>
  )
}

export async function getServerSideProps() {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ["data.product"],
  });
  console.log(prices);

  return { props: { prices: prices.data, title: 'Index' } };

}
