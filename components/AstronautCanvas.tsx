"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function AstronautModel() {
  const { scene } = useGLTF("/models/helmet.glb");
  const modelRef = useRef<THREE.Group>(null);
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetPos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!modelRef.current) return;
    
    // Smooth interpolation (lerp) towards target mouse pos
    // Rotation (max 8 degrees = ~0.14 radians)
    const targetRotX = targetPos.current.y * 0.14;
    const targetRotY = targetPos.current.x * 0.14;
    
    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotX, delta * 3);
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotY, delta * 3);
    
    // Translation
    const targetPosX = targetPos.current.x * 0.2;
    const targetPosY = targetPos.current.y * 0.2;
    
    modelRef.current.position.x = THREE.MathUtils.lerp(modelRef.current.position.x, targetPosX, delta * 3);
    modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, targetPosY, delta * 3);
  });

  return (
    <group ref={modelRef}>
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        {/* Closeup settings */}
        <primitive object={scene} scale={3.5} position={[0, -0.5, 0]} />
      </Float>
    </group>
  );
}

export default function AstronautCanvas() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <AstronautModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/helmet.glb");
