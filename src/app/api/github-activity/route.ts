import { NextResponse } from 'next/server';
import { fetchGitHubActivity } from '@/lib/github';

export async function GET() {
    try {
        const activities = await fetchGitHubActivity();
        return NextResponse.json(activities);
    } catch (error) {
        console.error('GitHub API route error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch GitHub activity' },
            { status: 500 }
        );
    }
}

export const revalidate = 300; // Revalidate every 5 minutes
