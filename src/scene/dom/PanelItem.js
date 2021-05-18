import React, { useCallback, useState } from 'react';
import usePurchase from '@/hooks/usePurchase';
import { CartProvider, useCart } from "react-use-cart";

export default function PanelItems(props) {

    // const onClick = useCallback((link)=>{
    //     if(link){    
    //         handleSubmit(link);
    //     }
    // },[])

    const { purchase } = usePurchase();
    const {
        isEmpty,
        cartTotal,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        emptyCart
      } = useCart();

    const enterHover = useCallback((e)=>{
        const el = e.currentTarget;
        el.style.backgroundColor = '#900000';
    })

    const leaveHover = useCallback((e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = 'transparent';
    })

    console.log(items)

    return (
      <>
      <CartProvider
        id="jamie"
        onItemAdd={item => console.log(`Item ${item.id} added!`)}
        onItemUpdate={item => console.log(`Item ${item.id} updated.!`)}
        onItemRemove={() => console.log(`Item removed!`)}
      >
        <div style={{position:'absolute', width:'100%', height:'100vh', backgroundColor:'#333333', opacity:'0.5', zIndex:20 }}></div>
        <div style={{top:'50px', position:'absolute', display:'flex', flexDirection:'row', flexWrap:'wrap', zIndex: 25}}>
            holiiiiiiiiiiiiiiiiii
            {/* { links.map((l,i) => (
                <div key={i} onMouseEnter={(e)=>enterHover(e)} onMouseLeave={(e)=>leaveHover(e)} style={{width:'100px', height:'100px', margin:'10px', color:'white', borderRadius:'20px', cursor:'pointer' }}
                            onPointerDown={(e)=>onClick(l.link)}>{l.name}</div>
            ))} */}
        </div>
      </CartProvider>
      </>
    )
  }