"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera, PresentationControls, MeshTransmissionMaterial, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Glitch, ChromaticAberration, Noise } from "@react-three/postprocessing";
import * as THREE from "three";

type VariantType = "cyber" | "liquid" | "crystal" | "neural" | "blob" | "kinetic";

// --- SUB-COMPONENTS (Defined Outside to prevent Hook issues) ---

const CrystalMesh = ({ geometry, pos }: { geometry: THREE.BufferGeometry, pos?: [number, number, number] }) => (
    <mesh geometry={geometry} position={pos}>
        <MeshTransmissionMaterial thickness={0.5} roughness={0} transmission={1} ior={1.5} chromaticAberration={0.1} backside background={new THREE.Color("#000")} />
    </mesh>
);

const BlobMesh = () => (
    <mesh scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color="#4400FF" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0} metalness={0.1} distort={0.5} speed={2} />
    </mesh>
);

const NeuralMesh = () => (
    <group>
        {/* Abstract Node Network */}
        {Array.from({ length: 20 }).map((_, i) => (
            <mesh key={i} position={[Math.sin(i) * 3, Math.cos(i * 2) * 3, Math.sin(i * 3) * 3]}>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial color="#00FF88" emissive="#00FF88" emissiveIntensity={2} wireframe />
            </mesh>
        ))}
        {/* Central Hub */}
        <mesh>
            <icosahedronGeometry args={[1.5, 2]} />
            <meshStandardMaterial color="#000" wireframe />
        </mesh>
    </group>
);

// --- MAIN COMPONENT ---

function SkitlaShape({ variant }: { variant: VariantType }) {
    // 1. MATERIALS (Always called in same order)
    const cyberMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: "#00FFDD", wireframe: true, toneMapped: false }), []);
    const liquidMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#C0C0C0", roughness: 0.1, metalness: 1.0, clearcoat: 1.0, flatShading: false, envMapIntensity: 2.0 }), []);
    const kineticMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#FF5500", emissive: "#FF0000", emissiveIntensity: 0.5, roughness: 0.2, metalness: 0.8 }), []);

    // 2. GEOMETRY (Always called)
    const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSegments: 32, bevelSize: 0.04, bevelThickness: 0.04, curveSegments: 128 };

    const triangleShape = useMemo(() => {
        const shape = new THREE.Shape();
        const r = 2.8; const x1 = 0; const y1 = r;
        const x2 = r * Math.sin(2 * Math.PI / 3); const y2 = r * Math.cos(2 * Math.PI / 3);
        const x3 = -r * Math.sin(2 * Math.PI / 3); const y3 = r * Math.cos(2 * Math.PI / 3);
        shape.moveTo(x1, y1); shape.lineTo(x2, y2); shape.lineTo(x3, y3); shape.lineTo(x1, y1);
        const hole = new THREE.Path(); const t = 0.25;
        hole.moveTo(x1, y1 - t * 1.8); hole.lineTo(x2 - t * 0.6, y2 + t * 0.8); hole.lineTo(x3 + t * 0.6, y3 + t * 0.8); hole.lineTo(x1, y1 - t * 1.8);
        shape.holes.push(hole); return shape;
    }, []);

    const eyeShape = useMemo(() => {
        const shape = new THREE.Shape(); const w = 1.4; const h = 0.8;
        shape.moveTo(-w, 0); shape.quadraticCurveTo(0, h * 1.5, w, 0); shape.quadraticCurveTo(0, -h * 1.5, -w, 0);
        const hole = new THREE.Path(); const t = 0.2;
        hole.moveTo(-w + t, 0); hole.quadraticCurveTo(0, (h * 1.5) - t, w - t, 0); hole.quadraticCurveTo(0, -(h * 1.5) + t, -w + t, 0);
        shape.holes.push(hole); return shape;
    }, []);

    const pupilShape = useMemo(() => { const shape = new THREE.Shape(); shape.absarc(0, 0, 0.45, 0, Math.PI * 2, false); return shape; }, []);

    const ringShape = (radius: number, thickness: number) => {
        const shape = new THREE.Shape(); shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
        const hole = new THREE.Path(); hole.absarc(0, 0, radius - thickness, 0, Math.PI * 2, true);
        shape.holes.push(hole); return shape;
    };
    const outerRing = useMemo(() => ringShape(3.6, 0.15), []);
    const innerRing = useMemo(() => ringShape(2.9, 0.12), []);

    // 3. REFS (Always called)
    const groupRef = useRef<THREE.Group>(null);
    const outerRingRef = useRef<THREE.Mesh>(null);
    const innerRingRef = useRef<THREE.Mesh>(null);

    // 4. ANIMATION LOOP (Always called)
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            if (variant === 'kinetic') {
                groupRef.current.rotation.y = t * 0.5;
                groupRef.current.rotation.z = t * 0.2;
            } else {
                groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
            }
        }

        const speed = variant === 'cyber' ? 2 : 1;
        if (outerRingRef.current) { outerRingRef.current.rotation.x = Math.sin(t * 0.2 * speed) * 0.1; outerRingRef.current.rotation.y = t * 0.05 * speed; }
        if (innerRingRef.current) { innerRingRef.current.rotation.x = Math.cos(t * 0.3 * speed) * 0.1; innerRingRef.current.rotation.y = -t * 0.03 * speed; }
    });

    // Helper to select material (No hooks)
    const getMaterial = () => {
        if (variant === 'cyber') return cyberMaterial;
        if (variant === 'kinetic') return kineticMaterial;
        return liquidMaterial;
    };

    const StandardMesh = ({ geometry, pos }: { geometry: THREE.BufferGeometry, pos?: [number, number, number] }) => (
        <mesh geometry={geometry} material={getMaterial()} position={pos} />
    );

    // 5. CONDITIONAL RENDERING (Safe because it's last)
    if (variant === 'blob') return <BlobMesh />;
    if (variant === 'neural') return <NeuralMesh />;

    const RenderMesh = variant === 'crystal' ? CrystalMesh : StandardMesh;

    return (
        <group ref={groupRef} scale={0.7} rotation={[0, 0, 0]}>
            <RenderMesh geometry={new THREE.ExtrudeGeometry(outerRing, extrudeSettings)} pos={[0, 0, -0.1]} />
            <RenderMesh geometry={new THREE.ExtrudeGeometry(innerRing, extrudeSettings)} pos={[0, 0, -0.1]} />
            <RenderMesh geometry={new THREE.ExtrudeGeometry(triangleShape, extrudeSettings)} pos={[0, -0.3, 0.1]} />

            <group position={[0, -0.2, 0.2]}>
                <RenderMesh geometry={new THREE.ExtrudeGeometry(eyeShape, { ...extrudeSettings, depth: 0.2 })} />
                <mesh geometry={new THREE.ExtrudeGeometry(pupilShape, { ...extrudeSettings, depth: 0.25 })} material={new THREE.MeshBasicMaterial({ color: "#000" })} position={[0, 0, 0.05]} />
            </group>
        </group>
    );
}

export default function SkitlaLogoVariant({ variant }: { variant: VariantType }) {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={5} color={variant === 'cyber' || variant === 'neural' ? "#00FFDD" : "#FFFFFF"} />
                <spotLight position={[-10, 0, 10]} angle={0.5} penumbra={1} intensity={3} color={variant === 'cyber' ? "#FF00AA" : "#FFFFFF"} />

                <PresentationControls global rotation={[0, 0, 0]} polar={[-Math.PI / 5, Math.PI / 5]} azimuth={[-Math.PI / 5, Math.PI / 5]}>
                    <Float speed={variant === 'liquid' || variant === 'blob' ? 6 : 4} rotationIntensity={0.5} floatIntensity={0.5}>
                        <SkitlaShape variant={variant} />
                    </Float>

                    <Suspense fallback={null}>
                        {(variant === 'cyber' || variant === 'neural' || variant === 'kinetic') && (
                            <EffectComposer>
                                <Bloom luminanceThreshold={0} intensity={1.5} radius={0.5} />
                                {(variant === 'cyber' ? <Glitch delay={new THREE.Vector2(1.5, 3.5)} duration={new THREE.Vector2(0.1, 0.3)} strength={new THREE.Vector2(0.1, 0.2)} ratio={0.85} /> : null) as any}
                                <Noise opacity={0.1} />
                            </EffectComposer>
                        )}
                        {(variant === 'liquid' || variant === 'blob') && (
                            <>
                                <Environment preset="warehouse" background={false} />
                                <EffectComposer>
                                    <Bloom luminanceThreshold={0.8} intensity={0.5} />
                                    {(variant !== 'blob' ? <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} /> : null) as any}
                                </EffectComposer>
                            </>
                        )}
                        {variant === 'crystal' && (
                            <>
                                <Environment preset="city" background={false} />
                                <EffectComposer>
                                    <Bloom luminanceThreshold={1} intensity={0.5} />
                                </EffectComposer>
                            </>
                        )}
                    </Suspense>
                </PresentationControls>
            </Canvas>
        </div>
    );
}
