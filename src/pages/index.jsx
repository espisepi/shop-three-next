import React, {Suspense, useEffect, useState, useCallback, useRef} from 'react';
import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
// import { createCheckoutSession } from "next-stripe/client";
import usePurchase from '@/hooks/usePurchase';

import PanelItems from '@/scene/dom/PanelItem';
import Hamburger from 'hamburger-react';

const Scene = dynamic(() => import('@/scene/Scene'), {
  ssr: false,
})

// const usePurchase = dynamic(() => import('@/hooks/usePurchase'), {
//   ssr: false,
// });

export default function Page({ title, prices }) {

  useStore.setState({ title })

  const { purchase } = usePurchase();

  const [showPanel, setShowPanel] = useState(false);
  const changeShowPanel = useCallback(()=> {
      setShowPanel(s => !s);
  });

  const products = prices.map( p => ( {
    id: p.id,
    price: ((p.unit_amount) / 100).toFixed(2),
    quantity: 0,
    img: p.product.images[0],
  } ) );

  return (
    <>
      {/* <h1>HOla mundo</h1> */}
      <Scene r3f purchase={purchase} products={products} />
      { showPanel ? <PanelItems products={products} /> : <div></div> }

      <div style={{zIndex:20, position:'absolute', right:'10px', top:'10px'}}>
          <Hamburger toggled={showPanel} toggle={changeShowPanel} color='#FFFFFF' />
      </div>
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
