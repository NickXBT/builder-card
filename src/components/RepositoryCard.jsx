import React from 'react';
import { Star, GitFork, Bookmark, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { getLanguageColor } from '../services/githubApi';

/**
 * Bright, Elegant & Minimalist RepositoryCard Component
 */
export default function RepositoryCard({ repo }) {
  const languageColor = getLanguageColor(repo.language);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.05)]"
    >
      <div className="space-y-2">
        {/* Header: Title and Link */}
        <div className="flex items-start justify-between gap-3">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold text-slate-900 group-hover:text-violet-600 transition-colors text-base break-all"
          >
            <Bookmark className="w-4 h-4 text-violet-500/80 shrink-0" />
            <span>{repo.name}</span>
          </a>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors shrink-0"
            title="Open on GitHub"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Repository Description */}
        <p className="text-slate-500 text-xs md:text-sm line-clamp-2 leading-relaxed font-normal">
          {repo.description || 'No description provided for this repository.'}
        </p>
      </div>

      {/* Footer Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-3 border-t border-slate-100 text-xs text-slate-500 font-mono">
        {/* Language Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/60">
          {repo.language ? (
            <>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: languageColor }}
              />
              <span className="text-slate-700 font-sans font-medium">{repo.language}</span>
            </>
          ) : (
            <span className="text-slate-400 font-sans italic">Plain Text</span>
          )}
        </div>

        {/* Stars and Forks */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-medium text-slate-700" title="Stars">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span>{repo.stargazers_count.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1 font-medium text-slate-500" title="Forks">
            <GitFork className="w-3.5 h-3.5 text-slate-400" />
            <span>{repo.forks_count.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
