import React, { useCallback, useEffect, useState } from 'react';
import usePurchase from '@/hooks/usePurchase';
import { CartProvider, useCart } from "react-use-cart";

import useStoreCart from '../useStoreCart';

function Page( {products} ) {
    const { addItem, inCart } = useCart();
  
    return (
      <div>
        {products.map( p => {
          const alreadyAdded = inCart(p.id);
  
          return (
            <div key={p.id}>
              <button onClick={() => addItem(p)}>
                {alreadyAdded ? "Add again" : "Add to Cart"}
              </button>
              <img style={{width:'50px', height:'50px'}} src={p.img} />
            </div>
          );
        })}
      </div>
    );
  }
  
  function Cart() {
    const {
      isEmpty,
      cartTotal,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
      emptyCart,
      addItem
    } = useCart();

    const { itemsZustand, setItemsZustand }= useStoreCart(state => ({ itemsZustand: state.items, setItemsZustand: state.setItems }) );
    useEffect(()=>{

        for(let i = itemsZustand.length - 1; i >= 0; i-- ) {
            const item = itemsZustand[i];
            const finder = items.filter(i=> i.id === item.id);
            if(finder.length != 0) {
                updateItemQuantity(item.id, item.quantity + 1)
            } else {
                addItem(item);
            }
            itemsZustand.pop();
        }
        
    },[itemsZustand])

  
    if (isEmpty) return <p>Your cart is empty</p>;
  
    return (
      <>
        <h1>
          Cart ({totalUniqueItems} - {cartTotal})
        </h1>
  
        {!isEmpty && <button onClick={emptyCart}>Empty cart</button>}
  
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.quantity} x {item.name}
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button onClick={() => removeItem(item.id)}>Remove &times;</button>
              <img style={{width:'50px', height:'50px'}} src={item.img} />
            </li>
          ))}
        </ul>
      </>
    );
  }

export default function PanelItems({products}) {

    const { purchase } = usePurchase();

    const enterHover = useCallback((e)=>{
        const el = e.currentTarget;
        el.style.backgroundColor = '#900000';
    })

    const leaveHover = useCallback((e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = 'transparent';
    })

    return (
      <>
      <CartProvider
          id="espisepi"
        //   onItemAdd={item => console.log(`Item ${item.id} added!`)}
        //   onItemUpdate={item => console.log(`Item ${item.id} updated.!`)}
        //   onItemRemove={() => console.log(`Item removed!`)}
        >
        <div style={{position:'absolute', width:'100%', height:'100vh', backgroundColor:'#333333', opacity:'0.5', zIndex:20 }}></div>
        <div style={{top:'50px', position:'absolute', display:'flex', flexDirection:'row', flexWrap:'wrap', zIndex: 25}}>

            <Cart />
            <Page products={products} />

        </div>
        </CartProvider>
      </>
    )
  }