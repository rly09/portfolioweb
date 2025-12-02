import { User } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pb-20">
            <div className="flex flex-col gap-6 border-b border-white/5 pb-10 mb-16">
                <h1 className="text-5xl font-light tracking-tight">About Me</h1>
                <p className="text-neutral-400 max-w-xl text-lg font-light">
                    A journey through code, design, and mobile innovation.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <section className="glass-card p-8 rounded-2xl lg:col-span-2">
                    <h2 className="text-2xl font-light text-white mb-6">Background</h2>
                    <div className="space-y-4 text-neutral-400 leading-relaxed">
                        <p>
                            I'm Roshan Lal Yogi, an App Developer specializing in building high-performance
                            mobile applications that prioritize user experience and clean architecture.
                        </p>
                        <p>
                            My journey into mobile development began with a fascination for creating
                            seamless, intuitive interfaces that users love. Over the years, I've honed
                            my skills in Flutter and native development, delivering
                            production-ready apps across various domains.
                        </p>
                    </div>
                </section>

                <section className="glass-card p-8 rounded-2xl">
                    <h2 className="text-2xl font-light text-white mb-6">Approach</h2>
                    <div className="space-y-4 text-neutral-400 leading-relaxed">
                        <p>
                            I believe in building apps that work offline-first, render at 60fps,
                            and feel natural to the touch. Every interaction should be meaningful,
                            every animation purposeful.
                        </p>
                        <p>
                            My development process emphasizes clean architecture, comprehensive testing,
                            and continuous integration.
                        </p>
                    </div>
                </section>

                <section className="glass-card p-8 rounded-2xl">
                    <h2 className="text-2xl font-light text-white mb-6">Contact</h2>
                    <div className="text-neutral-400 leading-relaxed h-full flex flex-col justify-center">
                        <p className="mb-4">
                            Ready to build something amazing? Let's connect.
                        </p>
                        <a
                            href="mailto:yogiroshan2005@gmail.com"
                            className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors text-lg"
                        >
                            <User size={20} />
                            yogiroshan2005@gmail.com
                        </a>
                    </div>
                </section>

                <section className="glass-card p-8 rounded-2xl lg:col-span-2">
                    <h2 className="text-2xl font-light text-white mb-6">Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Flutter", "C++", "Python", "Django", "Firebase", "Supabase", "MySQL", "GitHub"].map((skill) => (
                            <div key={skill} className="border border-white/5 bg-white/[0.02] p-4 text-center hover:bg-white/[0.05] transition-colors rounded-lg">
                                <span className="text-sm text-neutral-300">{skill}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
