"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { InteractiveProfile } from "./InteractiveProfile";

export function Hero() {
    return (
        <section className="min-h-[70vh] flex items-center relative overflow-hidden py-10 md:py-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] font-mono tracking-widest text-green-500 uppercase">
                                System: Online
                            </span>
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]">
                        Roshan <br />
                        <span className="text-neutral-500">Lal Yogi.</span>
                    </h1>

                    <div className="mb-10">
                        <p className="text-xl text-white font-light mb-4">App Developer</p>
                        <blockquote className="text-lg text-neutral-400 max-w-xl leading-relaxed font-light text-balance italic border-l-2 border-neutral-800 pl-4">
                            "Start where you are. Use what you have. Do what you can."
                        </blockquote>
                    </div>

                    <p className="text-lg text-neutral-400 max-w-xl mb-12 leading-relaxed font-light text-balance">
                        Specializing in high-performance mobile applications.
                        Expert in Flutter & Native development, crafting fluid 60fps experiences with clean architecture and robust backend integration.
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <Link href="/projects">
                            <button className="group flex items-center gap-3 text-sm font-medium tracking-wide hover:text-neutral-400 transition-colors">
                                <span className="border-b border-white pb-1 group-hover:border-neutral-400 transition-colors">
                                    View Selected Works
                                </span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>

                        <Link href="/about">
                            <button className="text-sm font-medium tracking-wide text-neutral-500 hover:text-white transition-colors">
                                About Me
                            </button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-10 flex justify-center lg:justify-end"
                >
                    <InteractiveProfile />
                </motion.div>
            </div>
        </section>
    );
}
