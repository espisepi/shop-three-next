import React, { useMemo, useEffect, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations(){
    return (
        <>
        <ListItemsAnimation gsap={gsap} />
        </>
    );
}

function ListItemsAnimation({gsap}) {

    const el = useMemo(()=>document.getElementById('list_items'));

    const[firstTime,setFirsTime] = useState(true);
    useEffect(()=>{
        if (firstTime) {
            setFirsTime(false);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-one",
                    start: 'top top',
                    endTrigger: ".section-three",
                    end: 'bottom bottom',
                    scrub: 1,
                }
            });
            tl.to( el, { y: -1000.0 } );
        }
    },[]);

    return null;
}