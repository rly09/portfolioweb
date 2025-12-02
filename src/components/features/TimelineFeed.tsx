"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, Star, Zap, GitBranch, GitFork } from "lucide-react";

interface Activity {
    id: string;
    type: string;
    title: string;
    description: string;
    time: string;
    repo?: string;
    url?: string;
}

const iconMap: Record<string, any> = {
    PushEvent: GitCommit,
    CreateEvent: GitBranch,
    WatchEvent: Star,
    ForkEvent: GitFork,
    IssuesEvent: GitPullRequest,
    PullRequestEvent: GitPullRequest,
    commit: GitCommit,
    pr: GitPullRequest,
    milestone: Star,
    experiment: Zap,
};

export function TimelineFeed() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
        // Refresh every 5 minutes
        const interval = setInterval(fetchActivities, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    async function fetchActivities() {
        try {
            const response = await fetch('/api/github-activity');
            if (response.ok) {
                const data = await response.json();
                setActivities(data);
            }
        } catch (error) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full border-l border-neutral-800 pl-8 py-2">
            <div className="flex items-center justify-between mb-10">
                <h3 className="text-sm font-medium tracking-widest uppercase text-neutral-500">
                    Recent Activity
                </h3>
                {loading && (
                    <div className="w-2 h-2 bg-neutral-600 rounded-full animate-pulse" />
                )}
            </div>

            <div className="space-y-10">
                {activities.map((item, index) => {
                    const Icon = iconMap[item.type] || GitCommit;

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative group"
                        >
                            <div className="absolute -left-[39px] top-1 w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700 group-hover:bg-white group-hover:border-white transition-colors duration-300" />

                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                                            {item.title}
                                        </h4>
                                        <span className="text-[10px] text-neutral-600 font-mono">{item.time}</span>
                                    </div>
                                    <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
                                        {item.description}
                                    </p>
                                    {item.repo && (
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] text-neutral-700 hover:text-neutral-400 transition-colors mt-2 inline-block font-mono"
                                        >
                                            {item.repo}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-10">
                <a
                    href="https://github.com/rly09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-600 hover:text-white transition-colors font-mono flex items-center gap-2"
                >
                    <span className="w-4 h-[1px] bg-neutral-700" /> VIEW ON GITHUB
                </a>
            </div>
        </div>
    );
}
