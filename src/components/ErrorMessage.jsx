import React from 'react';
import { AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Bright, Elegant ErrorMessage Component
 */
export default function ErrorMessage({ message, onRetry }) {
  const isRateLimit = message && message.toLowerCase().includes('rate limit');

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto p-5 rounded-2xl bg-white border border-rose-200/80 text-slate-800 shadow-[0_2px_12px_rgba(244,63,94,0.04)] space-y-3.5"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-rose-50 text-rose-500 shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-0.5">
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
            {isRateLimit ? 'GitHub API Rate Limit' : 'Unable to load profile'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">{message}</p>
        </div>
      </div>

      {/* Helpful tips */}
      <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-violet-500 shrink-0" />
          <span>
            {isRateLimit
              ? 'GitHub limits unauthenticated calls to 60/hr per IP.'
              : 'You can paste full profile URLs (e.g. https://github.com/username) or just the username.'}
          </span>
        </div>

        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition-colors cursor-pointer self-start sm:self-auto text-xs"
          >
            <RefreshCw className="w-3 h-3 text-violet-600" />
            <span>Try Again</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
