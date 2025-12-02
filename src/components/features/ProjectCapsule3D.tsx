"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Html, Float, PerspectiveCamera, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

function Capsule({ title, description, active, onClick }: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Gentle rotation
            meshRef.current.rotation.y += delta * 0.2;
            if (hovered || active) {
                meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0.5, 0.1);
            } else {
                meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
            }
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                scale={active ? 1.1 : 1}
                onClick={onClick}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <icosahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial
                    color={active || hovered ? "#ffffff" : "#2a2a2a"}
                    roughness={0.3}
                    metalness={0.8}
                    wireframe={!active && !hovered}
                />

                {/* Inner geometry for depth */}
                <mesh scale={0.9}>
                    <icosahedronGeometry args={[1.5, 1]} />
                    <meshBasicMaterial color="#000000" wireframe transparent opacity={0.1} />
                </mesh>

                <Html position={[0, -2.2, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
                    <div className={`text-center w-48 transition-all duration-500 ${active || hovered ? 'opacity-100 transform translate-y-0' : 'opacity-40 transform translate-y-2'}`}>
                        <h3 className="text-sm font-medium tracking-widest uppercase text-white">{title}</h3>
                    </div>
                </Html>
            </mesh>
        </Float>
    );
}

export function ProjectCapsule3D({ projects }: { projects: any[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="h-[500px] w-full relative bg-neutral-900/20 rounded-sm overflow-hidden border border-white/5">
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <h2 className="text-sm font-mono text-neutral-500 tracking-widest">PROJECT_MATRIX</h2>
                <p className="text-[10px] text-neutral-600 font-mono mt-1">INTERACTIVE_MODULE_LOADED</p>
            </div>

            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} intensity={1} angle={0.5} penumbra={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="white" />

                <group position={[0, 0, 0]}>
                    {projects.map((project, i) => (
                        <group key={project.id} position={[(i - 1) * 4.5, 0, 0]}>
                            <Capsule
                                {...project}
                                active={activeIndex === i}
                                onClick={() => setActiveIndex(i === activeIndex ? null : i)}
                            />
                        </group>
                    ))}
                </group>

                <ContactShadows opacity={0.4} scale={20} blur={2} far={4.5} />
                <Environment preset="studio" />
            </Canvas>

            {activeIndex !== null && (
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent">
                    <div className="flex justify-between items-end max-w-3xl mx-auto">
                        <div>
                            <h3 className="text-3xl font-light mb-3 text-white">{projects[activeIndex].title}</h3>
                            <p className="text-neutral-400 text-sm mb-6 max-w-md leading-relaxed">
                                {projects[activeIndex].description}
                            </p>
                            <div className="flex gap-3 mb-6">
                                {projects[activeIndex].tags.map((tag: string) => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider text-neutral-500 border border-neutral-800 px-2 py-1 rounded-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button className="text-xs font-bold bg-white text-black px-6 py-3 hover:bg-neutral-200 transition-colors tracking-wide">
                                VIEW CASE STUDY
                            </button>
                        </div>
                        <div className="hidden md:block">
                            <div className="text-6xl font-thin text-neutral-800">
                                0{activeIndex + 1}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
