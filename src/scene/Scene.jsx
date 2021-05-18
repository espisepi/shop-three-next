import React, { Suspense, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useThree, useLoader, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

import Loading from '@/components/canvas/Loading';
import Stars from '@/components/canvas/Stars';
import Box from '@/components/canvas/Box';

import { A11y } from '@react-three/a11y'
import useStore from '@/helpers/store'
import { CineonToneMapping } from 'three';

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

export default function Scene({purchase}) {

    const { scene } = useThree();
    useEffect(()=>{
        if(scene){
            scene.background = new THREE.Color('black');
        }
    },[])

    return (
        <>
        <ambientLight intensity={0.15} />
        <directionalLight intensity={0.5} position={[0,100,100]} />
        <directionalLight intensity={0.5} position={[0,100,-100]} />
        <Stars />
        <Suspense fallback={<Loading />}>
            <ModelScene />
            <PlanePurchase r3f purchase={purchase} />
        </Suspense>
        <OrbitControls enablePan={false} />
        {/* <BackgroundPrincipalDiv /> */}
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