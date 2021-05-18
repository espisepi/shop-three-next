import React, { useCallback, useState } from 'react';

export default function PanelItems(props) {

    // const onClick = useCallback((link)=>{
    //     if(link){    
    //         handleSubmit(link);
    //     }
    // },[])

    console.log('oli')

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
      <div style={{position:'absolute', width:'100%', height:'100vh', backgroundColor:'#333333', opacity:'0.5', zIndex:20 }}></div>
      <div style={{top:'50px', position:'absolute', display:'flex', flexDirection:'row', flexWrap:'wrap', zIndex: 25}}>
          holiiiiiiiiiiiiiiiiii
          {/* { links.map((l,i) => (
              <div key={i} onMouseEnter={(e)=>enterHover(e)} onMouseLeave={(e)=>leaveHover(e)} style={{width:'100px', height:'100px', margin:'10px', color:'white', borderRadius:'20px', cursor:'pointer' }}
                           onPointerDown={(e)=>onClick(l.link)}>{l.name}</div>
          ))} */}
      </div>
      </>
    )
  }