import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useThree, useLoader, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

import Loading from '@/components/canvas/Loading';
import Stars from '@/components/canvas/Stars';
import Box from '@/components/canvas/Box';

import { A11y } from '@react-three/a11y'
import useStore from '@/helpers/store'
import { CineonToneMapping } from 'three';

import { CartProvider, useCart } from "react-use-cart";

import useStoreCart from './useStoreCart';

import { Perf } from 'r3f-perf';

function ModelScene() {
    const gltf = useGLTF('obj/scene.glb');
    // console.log(gltf);
    const [texture,texture_disp,texture_norm] = useLoader(THREE.TextureLoader, ['img/1.png','img/1_disp.png','img/1_norm.png']);
    const [text_env] = useLoader(THREE.TextureLoader, ['img/2_new.png']);
    gltf.scene.traverse((o)=>{
        if(o.name === 'Sphere'){


            o.material = new THREE.MeshPhysicalMaterial({
                clearcoat: 1.0,
                // clearcoatRoughness: 0.1,
                metalness: 0.0,
                roughness: 0.0,
                map: texture,
                normalMap: texture_norm,
                envMap: text_env,
                // displacementScale:0.01,
                // displacementMap: texture_disp,
                side:THREE.DoubleSide
            });
        }
    });

    const sphere = useMemo(()=>{
        return gltf.nodes.Sphere;
    },[]);

    useFrame((state,dt)=>{
        sphere.rotation.y -= dt * 0.05;
    })

    const { scene, gl, camera } = useThree();
    useEffect(()=>{
        scene.background = text_env;

        gl.toneMapping = THREE.LinearToneMapping;

        camera.position.z = 20;
    },[])

    return (
    <group>
      <primitive object={gltf.scene} />
    </group>
    );
}

function PlanePurchase({ purchase }) {
    const router = useStore((s) => s.router)
    return(
    <A11y
      role='button'
      actionCall={() => {
        purchase()
      }}
    >
      <mesh position={[0,0,-5]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color='red'
        />
      </mesh>
    </A11y>
    );
}

function ModelProducts({products}) {

  const gltf = useGLTF('obj/scene.glb');

  const images = useMemo(()=>(products.map(p=> `https://espicors.herokuapp.com/` + p.img)));
  const textures = useLoader(THREE.TextureLoader, images);

  const { addItem } = useStoreCart(state => ({items: state.items, addItem:state.addItem}) )

  const sphereMeshes = useMemo(()=>{
    return textures.map( (t,i) =>{
      const geometry = gltf.nodes.Sphere.geometry.clone();
      const material = gltf.nodes.Sphere.material.clone();
      t.flipY = false;
      material.map = t;
      return new THREE.Mesh(geometry, material);
    });
  })
  
  return (

    <group name="products">
      { products.map( (p,i) => (
        <A11y
          key={i}
          role='button'
          actionCall={() => {
            addItem(p)
          }}
        >
        {/* <primitive key={i} scale={[0.5,0.5,0.5]} position={[(i-1)*2,0,0]} object={gltf.nodes.Sphere.clone()} userData={{product:p}} /> */}
        <mesh key={i} name={`meshProduct${i}`} geometry={sphereMeshes[i].geometry} material={sphereMeshes[i].material} scale={[0.5,0.5,0.5]} position={[(i-1)*2,0,0]} userData={{product:p}} />
        </A11y>
      )) }
    </group>

    // <group>
    //   <primitive scale={[0.5,0.5,0.5]} object={gltf.nodes.Sphere} />
    //   <primitive scale={[0.5,0.5,0.5]} position={[2,0,0]} object={gltf.nodes.Sphere.clone()} />
    //   <primitive scale={[0.5,0.5,0.5]} position={[-2,0,0]} object={gltf.nodes.Sphere.clone()} />
    // </group>
  );
}

export default function Scene({ products }) {

    const { scene } = useThree();
    useEffect(()=>{
        if(scene){
            scene.background = new THREE.Color('black');
        }
        console.log(scene)
    },[])

    return (
        <>
        <Perf />
        <CartProvider
          id="jamie"
          onItemAdd={item => console.log(`Item ${item.id} added!`)}
          onItemUpdate={item => console.log(`Item ${item.id} updated.!`)}
          onItemRemove={() => console.log(`Item removed!`)}
        >
          <ambientLight intensity={0.15} />
          <directionalLight intensity={0.5} position={[0,100,100]} />
          <directionalLight intensity={0.5} position={[0,100,-100]} />
          <Stars />
          <Suspense fallback={<Loading />}>
              <ModelProducts products={products} />
              {/* <ModelScene /> */}
              {/* <PlanePurchase r3f purchase={purchase} /> */}
          </Suspense>
          <OrbitControls enablePan={false} />
          {/* <BackgroundPrincipalDiv /> */}
        </CartProvider>
        </>
    );
}

function BackgroundPrincipalDiv() {
    const el = useMemo( () => document.getElementById('principalDiv') ) ;
    useEffect(()=>{
      el.style.zIndex = 0;
      return () => {
        el.style.zIndex = 10;
      }
    },[el]);
    return null;
}