"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";

function GeometricShape({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    const meshRef = useRef<THREE.Group>(null);
    const texture = useTexture("/profile-pic.png");

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Smooth rotation
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.25;

        // Mouse interaction
        const targetX = mouse.current[0] * 0.5;
        const targetY = mouse.current[1] * 0.5;

        meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * delta * 2;
        meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * delta * 2;
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Main Cube Structure */}
                <mesh>
                    <boxGeometry args={[2.5, 2.5, 2.5]} />
                    <meshStandardMaterial
                        map={texture}
                        roughness={0.2}
                        metalness={0.5}
                    />
                </mesh>

                {/* Wireframe Overlay */}
                <mesh scale={[1.01, 1.01, 1.01]}>
                    <boxGeometry args={[2.5, 2.5, 2.5]} />
                    <meshBasicMaterial
                        color="#404040"
                        wireframe
                        transparent
                        opacity={0.1}
                    />
                </mesh>
            </Float>
        </group>
    );
}

export function GeometricHero3D() {
    const mouse = useRef<[number, number]>([0, 0]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouse.current = [x, y];
    };

    return (
        <div
            className="w-full h-[400px] md:h-[600px] absolute top-0 right-0 z-0 opacity-60 pointer-events-none md:pointer-events-auto"
            onMouseMove={handleMouseMove}
        >
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <GeometricShape mouse={mouse} />

                <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2.5}
                    far={4}
                />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
