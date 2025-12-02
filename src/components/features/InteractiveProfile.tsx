"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export function InteractiveProfile() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the rotation
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Transform mouse position to rotation degrees
    // Range: -20 to 20 degrees
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = document.body.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate normalized position from center (-0.5 to 0.5)
        const mouseXPos = (e.clientX / width) - 0.5;
        const mouseYPos = (e.clientY / height) - 0.5;

        x.set(mouseXPos);
        y.set(mouseYPos);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="flex items-center justify-center perspective-1000 w-full h-full min-h-[400px]">
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full"
            >
                {/* Background Glow/Shadow */}
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-900 blur-2xl opacity-50 -z-10 transform translate-z-[-50px]"
                />

                {/* Main Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-neutral-800/50 shadow-2xl bg-neutral-900">
                    <Image
                        src="/profile-pic.png"
                        alt="Profile"
                        fill
                        className="object-cover transition-all duration-700 ease-out"
                        priority
                    />

                    {/* Glass Reflection Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none" />
                </div>
            </motion.div>
        </div>
    );
}
