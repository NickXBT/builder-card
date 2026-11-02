import React from 'react';
import { PieChart, Info } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Bright, Elegant & Minimalist LanguageStats Component
 */
export default function LanguageStats({ languages, totalReposWithLanguage }) {
  if (!languages || languages.length === 0) {
    return (
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-1.5">
          <PieChart className="w-4 h-4 text-violet-500" />
          <span>Languages</span>
        </h3>
        <p className="text-sm text-slate-500">No language data available for this user's repositories.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-violet-50 text-violet-600">
            <PieChart className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Top Languages</h3>
        </div>
        <span className="text-xs font-mono font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/70">
          Top {languages.length}
        </span>
      </div>

      {/* Animated Segmented Multi-Color Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden flex">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
            style={{
              backgroundColor: lang.color,
            }}
            className="h-full hover:opacity-90 cursor-pointer transition-opacity first:rounded-l-full last:rounded-r-full"
            title={`${lang.name}: ${lang.percentage}% (${lang.count} repos)`}
          />
        ))}
      </div>

      {/* Detailed Language List */}
      <div className="space-y-2 pt-0.5">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="flex items-center justify-between text-xs md:text-sm py-1.5 border-b border-slate-100 last:border-none"
          >
            {/* Color Dot & Language Name */}
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span className="font-medium text-slate-800 truncate">{lang.name}</span>
            </div>

            {/* Repos Count & Percentage */}
            <div className="flex items-center gap-3 shrink-0 font-mono">
              <span className="text-slate-400 text-xs">
                {lang.count} {lang.count === 1 ? 'repo' : 'repos'}
              </span>
              <span className="font-semibold text-violet-600 w-12 text-right">
                {lang.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology Note */}
      <div className="pt-2 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-400 leading-normal">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>
          Primary codebase language across {totalReposWithLanguage} repositories.
        </span>
      </div>
    </div>
  );
}
