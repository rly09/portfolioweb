import { Code2, Cpu, Database, Globe, Layers, Terminal, Brain } from "lucide-react";

interface Project {
    tags: string[];
}

export function ProjectStats({ projects }: { projects: Project[] }) {
    // Calculate tag frequency
    const tagCounts: Record<string, number> = {};
    projects.forEach(project => {
        project.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });

    // Convert to array and sort by count (descending)
    const sortedTags = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);

    // Map tags to icons (optional, or just use a generic one)
    const getIcon = (tag: string) => {
        const lower = tag.toLowerCase();
        if (lower.includes('flutter') || lower.includes('react')) return Globe;
        if (lower.includes('python') || lower.includes('dart')) return Code2;
        if (lower.includes('supabase') || lower.includes('firebase') || lower.includes('sql')) return Database;
        if (lower.includes('ai') || lower.includes('cnn') || lower.includes('gemini')) return Brain;
        return Layers;
    };

    // Helper for icon component since we can't store component refs easily in the map above without more boilerplate
    const IconWrapper = ({ tag }: { tag: string }) => {
        let Icon = Layers;
        const lower = tag.toLowerCase();
        if (lower.includes('flutter') || lower.includes('react') || lower.includes('next')) Icon = Globe;
        else if (lower.includes('python') || lower.includes('dart') || lower.includes('javascript')) Icon = Code2;
        else if (lower.includes('supabase') || lower.includes('isar') || lower.includes('sql')) Icon = Database;
        else if (lower.includes('api') || lower.includes('cnn') || lower.includes('opencv')) Icon = Cpu;
        else if (lower.includes('terminal')) Icon = Terminal;

        return <Icon size={20} className="text-neutral-600 group-hover:text-white transition-colors" strokeWidth={1.5} />;
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
            {sortedTags.map((item, i) => (
                <div
                    key={item.tag}
                    className="group p-6 border border-white/5 bg-neutral-900/20 hover:border-white/10 transition-all duration-300 rounded-sm flex flex-col justify-between"
                >
                    <div className="flex justify-between items-start mb-4">
                        <IconWrapper tag={item.tag} />
                        <span className="font-mono text-[10px] text-neutral-700">RANK_0{i + 1}</span>
                    </div>

                    <div>
                        <div className="text-3xl font-light text-white mb-1">
                            {item.count < 10 ? `0${item.count}` : item.count}
                        </div>

                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            {item.tag}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
