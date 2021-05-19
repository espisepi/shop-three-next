import React, { useCallback, useEffect, useState } from 'react';
import purchase from '@/hooks/purchase';
import { CartProvider, useCart } from "react-use-cart";

import useStoreCart from '../useStoreCart';

function Page( {products} ) {
    const { addItem, inCart } = useCart();
  
    return (

<div className="flex flex-wrap flex-col">
          {products.map( (item,i) => (
            // item.id, item.quantity, item.name
            
            // Card
            <div key={i} className="flex flex-row flex-nowrap p-1">

              <div className="flex-none w-28 h-28 relative">
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="flex-auto p-6">
                
                <div className="flex flex-wrap">

                  <h1 className="flex-auto text-xl font-semibold">
                    Classic Utility Jacket
                  </h1>
                  <div className="text-xl font-semibold text-gray-500">
                    $110.00
                  </div>
                  <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
                    In stock
                  </div>
                
                </div>

                <div className="flex space-x-3 mb-4 text-sm font-medium">
                  <div className="flex-auto flex space-x-3">
                    <button onPointerDown={()=>addItem(item)} className="w-1/2 flex items-center justify-center rounded-md bg-black text-white" type="submit">Add To Bag</button>
                  </div>
                </div>

              </div>

            </div>

          ))}
        </div>

      // <div>
      //   {products.map( p => {
      //     const alreadyAdded = inCart(p.id);
  
      //     return (
      //       <div key={p.id}>
      //         <button onClick={() => addItem(p)}>
      //           {alreadyAdded ? "Add again" : "Add to Cart"}
      //         </button>
      //         <img style={{width:'50px', height:'50px'}} src={p.img} />
      //       </div>
      //     );
      //   })}
      // </div>
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
        
    },[itemsZustand]);

    if (isEmpty) return <p>Your cart is empty</p>;
  
    return (
      <>
        <h1>
          Cart ({totalUniqueItems} - {cartTotal})
        </h1>
  
        {!isEmpty && <button onClick={emptyCart}>Empty cart</button>}

        <div className="flex flex-wrap flex-col">
          {items.map( (item,i) => (
            // item.id, item.quantity, item.name
            
            // Card
            <div key={i} className="flex flex-row flex-nowrap p-1">

              <div className="flex-none w-28 h-28 relative">
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="flex-auto p-6">
                
                <div className="flex flex-wrap">

                  <h1 className="flex-auto text-xl font-semibold">
                    Classic Utility Jacket
                  </h1>
                  <div className="text-xl font-semibold text-gray-500">
                    $110.00
                  </div>
                  <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
                    In stock
                  </div>
                
                </div>

                <div className="flex space-x-3 mb-4 text-sm font-medium">
                  <div className="flex-auto flex space-x-3">
                    <button className="w-1/2 flex items-center justify-center rounded-md bg-black text-white" type="submit">Add To Bag</button>
                  </div>
                </div>

              </div>

            </div>

          ))}
        </div>
  
        {/* <ul>
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
        <button onPointerDown={()=>purchase(items)} >Purchase</button> */}
      </>
    );
  }

export default function PanelItems({products}) {

 

    const enterHover = useCallback((e)=>{
        const el = e.currentTarget;
        // el.style.backgroundColor = '#900000';
        el.classList.add("bg-gray-400");
    })

    const leaveHover = useCallback((e) => {
        const el = e.currentTarget;
        el.classList.remove("bg-gray-400");
    })

    const [showCart, setShowCart] = useState(true);
    const changeViewCart = useCallback( (bool) => {
      setShowCart(bool);
    })

    return (
      <>
      <CartProvider
          id="espisepi"
        //   onItemAdd={item => console.log(`Item ${item.id} added!`)}
        //   onItemUpdate={item => console.log(`Item ${item.id} updated.!`)}
        //   onItemRemove={() => console.log(`Item removed!`)}
        >
        <div style={{position:'fixed', width:'100%', height:'100vh', backgroundColor:'#333333', opacity:'0.5', zIndex:20 }}></div>
        <div style={{ position:'fixed', zIndex: 25, width:'100%'}}>

          <div className="flex flex-row flex-nowrap">
              <div onPointerDown={(e)=>changeViewCart(true)} onMouseEnter={(e)=>enterHover(e)} onMouseLeave={(e)=>leaveHover(e)} style={{cursor:'pointer'}} className="w-6/12 h-12 justify-center bg-gray-400">Cart</div>
              <div onPointerDown={(e)=>changeViewCart(false)} onMouseEnter={(e)=>enterHover(e)} onMouseLeave={(e)=>leaveHover(e)} style={{cursor:'pointer'}} className="w-6/12 h-12 justify-center bg-gray-400">Products</div>
          </div>

            { showCart ? <Cart /> : <Page products={products} /> }
            {/* <Cart /> */}
            {/* <Page products={products} /> */}

        </div>
        </CartProvider>
      </>
    )
  }