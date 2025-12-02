import { ProjectStats } from "@/components/features/ProjectStats";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        id: 1,
        title: "Career Verse",
        description: "Full-stack Flutter app offering AI-powered personalized career paths through quiz analysis.",
        tags: ["Flutter", "Supabase", "Isar"],
        impact: [
            "Secure Supabase authentication",
            "Offline persistence with Isar",
            "Glassmorphic UI with Dark Mode",
            "PDF & WhatsApp result sharing"
        ],
        link: "#"
    },
    {
        id: 2,
        title: "PDF Brain",
        description: "Intelligent PDF assistant powered by Gemini API for summarization and chat interaction.",
        tags: ["Flutter", "Gemini API", "Syncfusion"],
        impact: [
            "AI-powered summarization",
            "Context-aware chatbot",
            "Keyword extraction engine",
            "Dual-theme productivity UI"
        ],
        link: "#"
    },
    {
        id: 3,
        title: "Parking Detection",
        description: "ML-based smart car parking detection system using deep learning and computer vision.",
        tags: ["Python", "OpenCV", "CNN"],
        impact: [
            "92% model accuracy",
            "60% efficiency improvement",
            "Real-time slot detection",
            "Automated monitoring system"
        ],
        link: "#"
    },
    {
        id: 4,
        title: "MIL",
        description: "Social media app built to master Firebase backend workflows, featuring real-time updates and scalable architecture.",
        tags: ["Flutter", "Firebase", "Firestore"],
        impact: [
            "Firebase Authentication & User Profiles",
            "Real-time Firestore Updates",
            "Media Posting & Feed Generation",
            "Scalable Flutter Architecture"
        ],
        link: "#"
    },
    {
        id: 5,
        title: "Court Kings",
        description: "Basketball score-tracking app optimized for quick interactions and real-time game management.",
        tags: ["Flutter", "State Management", "UI Design"],
        impact: [
            "Real-time Score & Foul Tracking",
            "Advanced Match Timer System",
            "Team Management Interface",
            "Optimized In-Game UI/UX"
        ],
        link: "#"
    }
];

export default function ProjectsPage() {
    return (
        <div className="space-y-20 pb-20">
            <div className="flex flex-col gap-6 border-b border-white/5 pb-10">
                <h1 className="text-5xl font-light tracking-tight">Selected Works</h1>
                <p className="text-neutral-400 max-w-xl text-lg font-light">
                    A curated collection of technical experiments and production-grade applications.
                </p>
            </div>

            <ProjectStats projects={projects} />

            <div className="grid grid-cols-1 gap-12">
                {projects.map((project, i) => (
                    <div key={project.id} className="group border-t border-white/10 pt-8 hover:border-white/30 transition-all duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="font-mono text-xs text-neutral-600">0{i + 1}</span>
                                        <Link href={project.link} className="text-neutral-500 hover:text-white transition-colors">
                                            <ArrowUpRight size={18} strokeWidth={1.5} />
                                        </Link>
                                    </div>
                                    <h3 className="text-3xl font-light mb-4 group-hover:text-white transition-colors">{project.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] uppercase tracking-wider text-neutral-500 border border-neutral-800/50 px-2 py-1 rounded-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-5">
                                <p className="text-neutral-400 text-lg font-light leading-relaxed mb-6">
                                    {project.description}
                                </p>
                            </div>

                            <div className="lg:col-span-3">
                                <ul className="space-y-3 border-l border-white/5 pl-6">
                                    {project.impact.map((item, idx) => (
                                        <li key={idx} className="text-sm text-neutral-500 font-light flex items-start gap-2">
                                            <span className="block mt-1.5 w-1 h-1 rounded-full bg-neutral-700 group-hover:bg-white/50 transition-colors" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
