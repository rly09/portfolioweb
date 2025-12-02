"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Node {
    id: string;
    x: number;
    y: number;
    label: string;
    category: "frontend" | "backend" | "core" | "tools";
}

interface Link {
    source: string;
    target: string;
}

const initialNodes: Node[] = [
    { id: "core", x: 50, y: 50, label: "App Dev", category: "core" },
    { id: "flutter", x: 30, y: 30, label: "Flutter", category: "frontend" },
    { id: "cpp", x: 20, y: 40, label: "C++", category: "core" },
    { id: "python", x: 40, y: 20, label: "Python", category: "backend" },
    { id: "django", x: 70, y: 30, label: "Django", category: "backend" },
    { id: "firebase", x: 80, y: 40, label: "Firebase", category: "backend" },
    { id: "supabase", x: 60, y: 70, label: "Supabase", category: "backend" },
    { id: "mysql", x: 75, y: 60, label: "MySQL", category: "backend" },
    { id: "github", x: 25, y: 60, label: "GitHub", category: "tools" },
];

const links: Link[] = [
    { source: "core", target: "flutter" },
    { source: "core", target: "cpp" },
    { source: "core", target: "python" },
    { source: "flutter", target: "firebase" },
    { source: "flutter", target: "supabase" },
    { source: "python", target: "django" },
    { source: "django", target: "mysql" },
    { source: "core", target: "github" },
];

export function SkillMindGraph() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [nodes, setNodes] = useState(initialNodes);

    useEffect(() => {
        const interval = setInterval(() => {
            setNodes(prev => prev.map(node => ({
                ...node,
                x: node.x + (Math.random() - 0.5) * 0.2, // Reduced movement for stability
                y: node.y + (Math.random() - 0.5) * 0.2,
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const getNodeColor = (category: string) => {
        switch (category) {
            case "core": return "bg-white text-black border-white";
            case "frontend": return "bg-neutral-200 text-black border-neutral-200";
            case "backend": return "bg-neutral-800 text-white border-neutral-700";
            case "tools": return "bg-neutral-900 text-neutral-400 border-neutral-800";
            default: return "bg-neutral-500";
        }
    };

    return (
        <div className="w-full h-[600px] relative bg-neutral-900/10 rounded-sm overflow-hidden border border-white/5">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {links.map((link, i) => {
                    const source = nodes.find(n => n.id === link.source);
                    const target = nodes.find(n => n.id === link.target);
                    if (!source || !target) return null;

                    const isActive = hoveredNode === link.source || hoveredNode === link.target;

                    return (
                        <line
                            key={i}
                            x1={`${source.x}%`}
                            y1={`${source.y}%`}
                            x2={`${target.x}%`}
                            y2={`${target.y}%`}
                            stroke={isActive ? "#ffffff" : "rgba(255,255,255,0.1)"}
                            strokeWidth={isActive ? 1.5 : 0.5}
                            className="transition-all duration-500"
                        />
                    );
                })}
            </svg>

            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full cursor-pointer border transition-all duration-500 ${getNodeColor(node.category)}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                >
                    <span className="font-medium text-[10px] uppercase tracking-wider whitespace-nowrap">{node.label}</span>
                </motion.div>
            ))}

            <div className="absolute bottom-6 right-6 flex gap-6 text-[10px] uppercase tracking-widest text-neutral-500">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neutral-200" /> Frontend
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700" /> Backend
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white" /> Core
                </div>
            </div>
        </div>
    );
}
