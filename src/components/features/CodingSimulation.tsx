"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Square, Terminal as TerminalIcon } from "lucide-react";

const codeSnippet = `
// Initializing App Environment...
import { Flutter, Python } from '@tech/stack';

class AppDeveloper extends Human {
  constructor() {
    super();
    this.name = "Roshan Lal Yogi";
    this.skills = ['Flutter', 'Python', 'C++', 'Django'];
    this.email = "yogiroshan2005@gmail.com";
  }

  async build(project) {
    if (project.isAmbitious) {
      await this.code(project);
      return new Innovation();
    }
  }
}

const session = new AppDeveloper();
console.log("System Online. Ready to build...");
`;

export function CodingSimulation() {
    const [code, setCode] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<string[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let i = 0;
        const typeCode = () => {
            if (i < codeSnippet.length) {
                setCode(codeSnippet.slice(0, i + 1));
                i++;
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
        };

        intervalRef.current = setInterval(typeCode, 30);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const runCode = () => {
        setIsRunning(true);
        setOutput([]);

        setTimeout(() => {
            setOutput(prev => [...prev, "> Compiling..."]);
        }, 500);

        setTimeout(() => {
            setOutput(prev => [...prev, "> Optimization complete.", "> System Online. Waiting for input..."]);
            setIsRunning(false);
        }, 1500);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-neutral-800 rounded-sm overflow-hidden shadow-2xl">
            {/* Window Title Bar */}
            <div className="bg-[#0a0a0a] px-4 py-3 flex items-center justify-between border-b border-neutral-800">
                <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <div className="w-3 h-3 rounded-full bg-neutral-700" />
                    <div className="w-3 h-3 rounded-full bg-neutral-700" />
                    <div className="w-3 h-3 rounded-full bg-neutral-700" />
                </div>
                <div className="text-xs text-neutral-500 font-mono tracking-wide">developer_profile.ts</div>
                <div className="w-16" />
            </div>

            {/* Editor Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 h-[500px]">
                <div className="md:col-span-2 bg-[#0a0a0a] p-8 font-mono text-sm overflow-auto relative">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#0a0a0a] border-r border-neutral-900 flex flex-col items-end pr-4 pt-8 text-neutral-800 select-none">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="leading-6 text-[10px]">{i + 1}</div>
                        ))}
                    </div>
                    <pre className="pl-8 text-neutral-300 leading-6 whitespace-pre-wrap">
                        <code dangerouslySetInnerHTML={{
                            __html: code
                                .replace(/import|class|constructor|super|async|return|const|new/g, '<span class="text-white font-bold">$&</span>')
                                .replace(/'[^']*'/g, '<span class="text-neutral-500 italic">$&</span>')
                                .replace(/\/\/.*/g, '<span class="text-neutral-700">$&</span>')
                                .replace(/console|log/g, '<span class="text-neutral-400">$&</span>')
                        }} />
                        <span className="animate-pulse inline-block w-2 h-4 bg-white ml-1 align-middle"></span>
                    </pre>
                </div>

                {/* Terminal / Output */}
                <div className="bg-[#050505] border-l border-neutral-800 flex flex-col">
                    <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-neutral-500 flex items-center gap-2 tracking-widest">
                            <TerminalIcon size={10} /> TERMINAL
                        </span>
                        <button
                            onClick={runCode}
                            disabled={isRunning}
                            className="p-1 hover:bg-neutral-800 rounded transition-colors disabled:opacity-50 text-neutral-400 hover:text-white"
                        >
                            {isRunning ? <Square size={12} /> : <Play size={12} />}
                        </button>
                    </div>
                    <div className="flex-1 p-6 font-mono text-xs text-neutral-400 overflow-auto">
                        <div className="mb-2 text-neutral-600">Microsoft Windows [Version 10.0.19045.4291]</div>
                        <div className="mb-6 text-neutral-600">(c) Microsoft Corporation. All rights reserved.</div>

                        <div className="mb-2">
                            <span className="text-white">roshan@portfolio</span>
                            <span className="text-neutral-600">:</span>
                            <span className="text-neutral-400">~/workspace</span>
                            <span className="text-white">$ node developer_profile.ts</span>
                        </div>

                        {output.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-1 text-neutral-300"
                            >
                                {line}
                            </motion.div>
                        ))}

                        {isRunning && (
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-neutral-600 mt-1"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
