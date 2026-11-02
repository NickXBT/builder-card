import React from 'react';
import { 
  Activity, 
  GitCommit, 
  GitPullRequest, 
  PlusCircle, 
  AlertCircle, 
  Star, 
  GitFork, 
  MessageSquare,
  Clock,
  ExternalLink
} from 'lucide-react';

function getRelativeTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  return `${Math.floor(diffInMonths / 12)}y ago`;
}

function formatEventDetails(event) {
  const repoName = event.repo ? event.repo.name : 'unknown repo';
  const repoUrl = `https://github.com/${repoName}`;

  switch (event.type) {
    case 'PushEvent': {
      const commitCount = event.payload?.commits?.length || 1;
      return {
        icon: <GitCommit className="w-3.5 h-3.5 text-blue-500" />,
        title: `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to`,
        repoName,
        repoUrl,
      };
    }
    case 'CreateEvent': {
      const refType = event.payload?.ref_type || 'repository';
      return {
        icon: <PlusCircle className="w-3.5 h-3.5 text-violet-500" />,
        title: `Created ${refType} in`,
        repoName,
        repoUrl,
      };
    }
    case 'PullRequestEvent': {
      const action = event.payload?.action || 'opened';
      return {
        icon: <GitPullRequest className="w-3.5 h-3.5 text-indigo-500" />,
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} pull request in`,
        repoName,
        repoUrl,
      };
    }
    case 'IssuesEvent': {
      const action = event.payload?.action || 'opened';
      return {
        icon: <AlertCircle className="w-3.5 h-3.5 text-amber-500" />,
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} issue in`,
        repoName,
        repoUrl,
      };
    }
    case 'WatchEvent': {
      return {
        icon: <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />,
        title: 'Starred repository',
        repoName,
        repoUrl,
      };
    }
    case 'ForkEvent': {
      return {
        icon: <GitFork className="w-3.5 h-3.5 text-blue-500" />,
        title: 'Forked repository',
        repoName,
        repoUrl,
      };
    }
    case 'IssueCommentEvent': {
      return {
        icon: <MessageSquare className="w-3.5 h-3.5 text-violet-500" />,
        title: 'Commented on issue in',
        repoName,
        repoUrl,
      };
    }
    default: {
      const readableType = event.type.replace('Event', '');
      return {
        icon: <Activity className="w-3.5 h-3.5 text-slate-400" />,
        title: `Activity (${readableType}) in`,
        repoName,
        repoUrl,
      };
    }
  }
}

/**
 * Bright, Elegant & Minimalist ActivityTimeline Component
 */
export default function ActivityTimeline({ events }) {
  const recentEvents = (events || []).slice(0, 5);

  if (recentEvents.length === 0) {
    return (
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-1.5">
          <Activity className="w-4 h-4 text-violet-500" />
          <span>Recent Activity</span>
        </h3>
        <p className="text-sm text-slate-500">No public activity recorded recently for this user.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-violet-50 text-violet-600">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
        </div>
        <span className="text-xs font-mono font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/70">
          Latest 5
        </span>
      </div>

      {/* Timeline items */}
      <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
        {recentEvents.map((event) => {
          const details = formatEventDetails(event);
          const relativeTime = getRelativeTime(event.created_at);

          return (
            <div key={event.id} className="relative group">
              {/* Event Dot Icon */}
              <div className="absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:scale-105 group-hover:border-violet-400 transition-all shadow-2xs">
                {details.icon}
              </div>

              {/* Event Content */}
              <div className="space-y-0.5">
                <div className="text-xs md:text-sm text-slate-800">
                  <span className="text-slate-500">{details.title} </span>
                  <a
                    href={details.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono font-medium text-violet-600 hover:text-violet-700 hover:underline transition-colors"
                  >
                    <span>{details.repoName}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-normal">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <time dateTime={event.created_at}>
                    {relativeTime} • {new Date(event.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
