"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function GlobeScene() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group position={[0, -2.5, 0]}>
            {/* The Liquid Metal Sphere - Bottom Anchored */}
            <Sphere ref={meshRef} args={[3.2, 64, 64]}>
                <MeshDistortMaterial
                    color="#D9B162"
                    emissive="#000000"
                    roughness={0.1}
                    metalness={1}
                    distort={0.2}
                    speed={1}
                    envMapIntensity={2}
                />
            </Sphere>

            {/* Atmospheric Rim */}
            <Sphere args={[3.15, 32, 32]}>
                <meshBasicMaterial
                    color="#E2A52C"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                />
            </Sphere>

            <Environment preset="city" />

            <directionalLight position={[-5, 5, 5]} intensity={4} color="#D9B162" />
            <ambientLight intensity={0.5} />
        </group>
    );
}

export default function Globe() {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas camera={{ position: [0, 0, 8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
                <GlobeScene />
            </Canvas>
        </div>
    );
}
