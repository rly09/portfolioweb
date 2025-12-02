import { Briefcase } from "lucide-react";

const experiences = [
    {
        id: 1,
        company: "Spazorlabs",
        role: "Flutter Developer Intern",
        period: "Oct 2025 – Present",
        description: "Developing and deploying cross-platform mobile applications using Flutter and Supabase, focusing on modern UI design and backend integration.",
        achievements: [
            "Developed and deployed cross-platform mobile apps using Flutter and Supabase, improving backend integration speed by 35%",
            "Designed modern, responsive UIs with Flutter widgets and animations, increasing user engagement by 40% across platforms",
            "Implemented real-time authentication and database operations using Supabase, enhancing app reliability and performance by 30%"
        ]
    }
];

export default function ExperiencePage() {
    return (
        <div className="pb-20">
            <div className="flex flex-col gap-6 border-b border-white/5 pb-10 mb-16">
                <h1 className="text-5xl font-light tracking-tight">Experience</h1>
                <p className="text-neutral-400 max-w-xl text-lg font-light">
                    Professional journey and key accomplishments in mobile development.
                </p>
            </div>

            <div className="space-y-16 max-w-4xl">
                {experiences.map((exp, index) => (
                    <div key={exp.id} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-white border-4 border-black" />

                        {/* Timeline line */}
                        {index !== experiences.length - 1 && (
                            <div className="absolute -left-[7px] top-6 bottom-0 w-[2px] bg-white/10" />
                        )}

                        <div className="pl-8">
                            <div className="glass-card p-8 rounded-2xl transition-all duration-300 hover:border-white/10 group">
                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-light text-white mb-1 group-hover:text-white transition-colors">{exp.role}</h2>
                                        <h3 className="text-lg text-neutral-400 group-hover:text-neutral-300 transition-colors">{exp.company}</h3>
                                    </div>
                                    <span className="text-sm text-neutral-500 font-mono mt-2 md:mt-0 bg-white/5 px-3 py-1 rounded-full border border-white/5">{exp.period}</span>
                                </div>

                                <p className="text-neutral-400 leading-relaxed mb-8 border-l-2 border-white/10 pl-4">
                                    {exp.description}
                                </p>

                                <div className="space-y-4">
                                    <h4 className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Key Achievements</h4>
                                    <ul className="space-y-3">
                                        {exp.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                                                <span className="text-white/40 mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                                                <span className="leading-relaxed">{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
