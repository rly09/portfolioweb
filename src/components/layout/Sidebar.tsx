"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    Home,
    Box,
    Cpu,
    User,
    Terminal,
    Briefcase,
    Settings,
    Linkedin,
    Github
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: User, label: "About", href: "/about" },
    { icon: Box, label: "Projects", href: "/projects" },
    { icon: Cpu, label: "Skill Graph", href: "/skills" },
    { icon: Briefcase, label: "Experience", href: "/experience" },
    { icon: Terminal, label: "Build Mode", href: "/build-with-me" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-10 z-50 bg-background/80 backdrop-blur-md border-r border-white/5"
        >
            <div className="mb-12">
                <Link
                    href="/"
                    className="w-10 h-8 bg-white text-black flex items-center justify-center font-bold text-xs rounded-sm hover:bg-neutral-200 transition-colors tracking-tighter"
                >
                    RLY
                </Link>
            </div>

            <nav className="flex-1 flex flex-col gap-6 w-full px-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative group flex items-center justify-center w-full h-10 transition-all duration-300"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute -left-4 w-1 h-5 bg-white rounded-r-full"
                                />
                            )}

                            <item.icon
                                size={18}
                                strokeWidth={1.5}
                                className={cn(
                                    "transition-colors duration-300",
                                    isActive ? "text-white" : "text-neutral-600 group-hover:text-neutral-300"
                                )}
                            />

                            {/* Tooltip - Minimal */}
                            <div className="absolute left-full ml-6 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] tracking-widest uppercase text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
                <a
                    href="https://www.linkedin.com/in/roshanlalyogi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 text-neutral-600 hover:text-white transition-all duration-300 hover:scale-110"
                >
                    <Linkedin size={18} strokeWidth={1.5} />
                    <div className="absolute left-full ml-6 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] tracking-widest uppercase text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        LinkedIn
                    </div>
                </a>

                <a
                    href="https://github.com/rly09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 text-neutral-600 hover:text-white transition-all duration-300 hover:scale-110"
                >
                    <Github size={18} strokeWidth={1.5} />
                    <div className="absolute left-full ml-6 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] tracking-widest uppercase text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        GitHub
                    </div>
                </a>
            </div>
        </motion.aside>
    );
}
