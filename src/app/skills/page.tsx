import { SkillMindGraph } from "@/components/features/SkillMindGraph";

export default function SkillsPage() {
    return (
        <div className="min-h-[80vh] flex flex-col">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Neural Competency Map</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Visualizing the connections between my technical skills, core competencies, and tools.
                    Hover over nodes to trace dependencies.
                </p>
            </div>

            <SkillMindGraph />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-primary mb-2">Frontend Architecture</h3>
                    <p className="text-sm text-muted-foreground">
                        Specializing in high-performance React applications, complex state management, and WebGL integrations.
                    </p>
                </div>
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-secondary mb-2">Backend Systems</h3>
                    <p className="text-sm text-muted-foreground">
                        Designing scalable microservices, real-time event pipelines, and secure API gateways.
                    </p>
                </div>
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-2">DevOps & Cloud</h3>
                    <p className="text-sm text-muted-foreground">
                        Automating CI/CD workflows, container orchestration, and infrastructure as code.
                    </p>
                </div>
            </div>
        </div>
    );
}
