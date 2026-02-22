"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Root group animation (slight wobble)
        if (groupRef.current) {
            groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
            groupRef.current.rotation.z = Math.cos(t * 0.2) * 0.05;
        }

        // Independent rotations for meshes (Multi-axis/Transversal)
        // scene.children[0] contains our logo assembly
        const assembly = scene.children[0];
        if (assembly) {
            const triangle = assembly.children[2];
            const eyeGroup = assembly.children[3];
            const outerRing = assembly.children[0];
            const innerRing = assembly.children[1];

            // 1. Rings continue staggered motion
            if (outerRing) {
                outerRing.rotation.y += delta * 0.55;
                outerRing.rotation.x = Math.sin(t * 0.5) * 0.3;
                outerRing.rotation.z = Math.cos(t * 0.3) * 0.15;
            }
            if (innerRing) {
                innerRing.rotation.y -= delta * 0.65;
                innerRing.rotation.x = Math.cos(t * 0.6) * 0.25;
                innerRing.rotation.z = Math.sin(t * 0.4) * 0.1;
            }

            // 2. Triangle + Eye MUST move as ONE PIECE
            if (triangle && eyeGroup) {
                triangle.rotation.y += delta * 0.45;
                triangle.rotation.x = Math.sin(t * 0.6) * 0.25;
                triangle.rotation.z = Math.cos(t * 0.4) * 0.1;

                // Sync Eye Group EXACTLY to Triangle
                eyeGroup.rotation.copy(triangle.rotation);

                // Keep triangle depth bounce
                triangle.position.z = 0.1 + Math.sin(t * 1.2) * 0.05;
                eyeGroup.position.z = triangle.position.z + 0.1; // Offset slightly for depth layering
            }
        }
    });

    return <primitive ref={groupRef} object={scene} scale={1.08} rotation={[0, 0, 0.05]} />;
}

export default function SkitlaLogo() {
    return (
        <div className="w-full h-full min-h-[300px] lg:min-h-[500px]">
            <Canvas
                dpr={[1, 2]}
                shadows
                gl={{ alpha: true, antialias: true }}
                camera={{ position: [0, 0, 14], fov: 45 }}
            >
                <ambientLight intensity={2.5} />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={12} color="#FFE5B4" castShadow />
                <spotLight position={[-10, 5, 10]} angle={0.5} penumbra={1} intensity={8} color="#D9B162" />
                <pointLight position={[0, -5, 5]} intensity={4} color="#D9B162" />

                <Suspense fallback={null}>
                    <Environment preset="city" blur={0.6} />
                    <Model url="/models/skitla-logo.glb" />
                    <Sparkles count={35} scale={12} size={2} speed={0.6} opacity={0.4} color="#D9B162" />
                    <ContactShadows position={[0, -4.5, 0]} opacity={0.5} scale={12} blur={3} far={4} />
                </Suspense>
            </Canvas>
        </div>
    );
}

// Pre-load the model to avoid pop-in
useGLTF.preload("/models/skitla-logo.glb");
