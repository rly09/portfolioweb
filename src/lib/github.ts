// GitHub API service for fetching user activity

export interface GitHubEvent {
    id: string;
    type: string;
    actor: {
        login: string;
        avatar_url: string;
    };
    repo: {
        name: string;
        url: string;
    };
    payload: any;
    created_at: string;
}

export interface Activity {
    id: string;
    type: string;
    title: string;
    description: string;
    time: string;
    repo?: string;
    url?: string;
}

const GITHUB_USERNAME = 'rly09';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;

export async function fetchGitHubActivity(): Promise<Activity[]> {
    try {
        const response = await fetch(GITHUB_API_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
            next: { revalidate: 300 }, // Revalidate every 5 minutes
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const events: GitHubEvent[] = await response.json();
        return parseGitHubEvents(events.slice(0, 4)); // Get latest 4 events
    } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        return getFallbackActivities();
    }
}

function parseGitHubEvents(events: GitHubEvent[]): Activity[] {
    return events.map(event => {
        const activity: Activity = {
            id: event.id,
            type: event.type,
            title: '',
            description: '',
            time: formatRelativeTime(event.created_at),
            repo: event.repo.name,
            url: `https://github.com/${event.repo.name}`,
        };

        switch (event.type) {
            case 'PushEvent':
                const commits = event.payload.commits?.length || 0;
                activity.title = `Pushed ${commits} commit${commits > 1 ? 's' : ''}`;
                activity.description = `Updated ${event.repo.name} with new changes`;
                break;

            case 'CreateEvent':
                const refType = event.payload.ref_type;
                activity.title = `Created ${refType}`;
                activity.description = refType === 'repository'
                    ? `New repository: ${event.repo.name}`
                    : `New ${refType} in ${event.repo.name}`;
                break;

            case 'WatchEvent':
                activity.title = 'Starred repository';
                activity.description = `Starred ${event.repo.name}`;
                break;

            case 'ForkEvent':
                activity.title = 'Forked repository';
                activity.description = `Forked ${event.repo.name}`;
                break;

            case 'IssuesEvent':
                const action = event.payload.action;
                activity.title = `${action.charAt(0).toUpperCase() + action.slice(1)} issue`;
                activity.description = `${event.payload.issue?.title || 'Issue'} in ${event.repo.name}`;
                break;

            case 'PullRequestEvent':
                const prAction = event.payload.action;
                activity.title = `${prAction.charAt(0).toUpperCase() + prAction.slice(1)} pull request`;
                activity.description = `${event.payload.pull_request?.title || 'PR'} in ${event.repo.name}`;
                break;

            default:
                activity.title = event.type.replace('Event', '');
                activity.description = `Activity in ${event.repo.name}`;
        }

        return activity;
    });
}

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 172800) return 'Yesterday';
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
}

function getFallbackActivities(): Activity[] {
    return [
        {
            id: '1',
            type: 'commit',
            title: 'Integrated Firebase Push Notifications',
            description: 'Implemented cloud messaging service with deep linking support for the E-Commerce App.',
            time: '2 hours ago',
        },
        {
            id: '2',
            type: 'pr',
            title: 'Optimized Flutter Rendering Engine',
            description: 'Merged PR #89: Reduced jank by implementing Impeller and optimizing list view builders.',
            time: 'Yesterday',
        },
        {
            id: '3',
            type: 'milestone',
            title: 'Published v2.0 to App Store',
            description: 'Major release for the Health Tracker app featuring offline sync and dark mode.',
            time: '3 days ago',
        },
        {
            id: '4',
            type: 'experiment',
            title: 'Prototyping with Kotlin Multiplatform',
            description: 'Exploring KMP for shared business logic across Android and iOS targets.',
            time: '1 week ago',
        },
    ];
}
