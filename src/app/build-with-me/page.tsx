import { CodingSimulation } from "@/components/features/CodingSimulation";

export default function BuildWithMePage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center mb-10 max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        Collaborative Intelligence
                    </span>
                </h1>
                <p className="text-muted-foreground">
                    Experience my development workflow. This simulation represents how I structure code,
                    handle logic, and optimize performance. Ready to build something real?
                </p>
            </div>

            <CodingSimulation />

            <div className="mt-12 flex gap-6">
                <a href="mailto:yogiroshan2005@gmail.com">
                    <button className="px-6 py-3 bg-primary text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                        Start a Project
                    </button>
                </a>
                <a href="https://github.com/rly09" target="_blank" rel="noopener noreferrer">
                    <button className="px-6 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                        View GitHub
                    </button>
                </a>
            </div>
        </div>
    );
}
