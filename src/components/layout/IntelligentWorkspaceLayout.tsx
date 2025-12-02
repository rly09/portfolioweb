"use client";

import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";

export function IntelligentWorkspaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-white/20 selection:text-white">
            {/* Background - Subtle Grain/Noise could be added here if desired, keeping it clean for now */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-900/20 via-background to-background" />
            </div>

            <Sidebar />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pl-20 min-h-screen relative z-10"
            >
                <div className="max-w-[1400px] mx-auto p-8 md:p-12 lg:p-16">
                    {children}
                </div>
            </motion.main>
        </div>
    );
}
