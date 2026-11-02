import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Bright, Elegant Loading Skeleton Component
 */
export default function Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-pulse">
      {/* Loading banner */}
      <div className="flex items-center justify-center gap-2 py-3 text-slate-500 font-medium text-xs">
        <Loader2 className="w-4 h-4 animate-spin text-violet-500" />
        <span>Fetching developer profile & analytics...</span>
      </div>

      {/* Profile Card Skeleton */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-slate-100" />
          <div className="flex-1 space-y-3 w-full text-center md:text-left">
            <div className="h-6 w-44 bg-slate-100 rounded-lg mx-auto md:mx-0" />
            <div className="h-3.5 w-28 bg-slate-100/70 rounded mx-auto md:mx-0" />
            <div className="h-3.5 w-full max-w-md bg-slate-100/50 rounded mx-auto md:mx-0" />
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <div className="h-4.5 w-20 bg-slate-100 rounded-md" />
              <div className="h-4.5 w-20 bg-slate-100 rounded-md" />
              <div className="h-4.5 w-20 bg-slate-100 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout for Analytics & Repos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Languages Skeleton */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div className="h-5 w-32 bg-slate-100 rounded-lg" />
          <div className="h-2.5 w-full bg-slate-100/70 rounded-full" />
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-3.5 w-20 bg-slate-100/60 rounded" />
                <div className="h-3.5 w-10 bg-slate-100/80 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Repositories Skeleton */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div className="h-5 w-40 bg-slate-100 rounded-lg" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-slate-100/60 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
