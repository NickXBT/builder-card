import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookMarked, 
  MapPin, 
  Briefcase, 
  Link as LinkIcon, 
  Calendar, 
  ExternalLink,
  Github
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Animated Number Counter for stats
 */
function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    if (target === 0) {
      setCount(0);
      return;
    }

    const duration = 600;
    const frameRate = 16;
    const totalFrames = duration / frameRate;
    const increment = Math.max(1, Math.ceil(target / totalFrames));

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}

/**
 * Bright, Elegant & Minimalist ProfileCard Component
 */
export default function ProfileCard({ profile }) {
  if (!profile) return null;

  const joinedDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  const formatUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : `https://${url}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] p-6 md:p-8"
    >
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        {/* Profile Picture with soft subtle ring */}
        <div className="relative shrink-0">
          <div className="p-1 rounded-full ring-2 ring-violet-100 ring-offset-2 ring-offset-white">
            <img
              src={profile.avatar_url}
              alt={`${profile.login}'s avatar`}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover bg-slate-50"
            />
          </div>
        </div>

        {/* Developer Info */}
        <div className="flex-1 text-center md:text-left space-y-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                {profile.name || profile.login}
              </h2>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-mono text-sm font-medium transition-colors mt-0.5"
              >
                @{profile.login}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* View on GitHub Button: Clean minimalist white button */}
            <motion.a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-sm font-medium border border-slate-200/90 transition-all shadow-xs"
            >
              <Github className="w-4 h-4 text-slate-500" />
              <span>View GitHub</span>
            </motion.a>
          </div>

          {/* Bio */}
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl font-normal">
            {profile.bio || 'This developer prefers code over words. No bio provided yet.'}
          </p>

          {/* Developer Stats: Soft light surface container */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 py-3.5 px-5 rounded-2xl bg-[#FAF8FF] border border-violet-100/60 max-w-xl">
            <div className="text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Repositories</span>
              <p className="text-xl md:text-2xl font-bold text-slate-900 font-mono mt-0.5">
                <AnimatedCounter value={profile.public_repos} />
              </p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Followers</span>
              <p className="text-xl md:text-2xl font-bold text-violet-600 font-mono mt-0.5">
                <AnimatedCounter value={profile.followers} />
              </p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Following</span>
              <p className="text-xl md:text-2xl font-bold text-blue-600 font-mono mt-0.5">
                <AnimatedCounter value={profile.following} />
              </p>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-3.5 text-xs text-slate-500">
            {profile.company && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-violet-500" />
                <span className="text-slate-700 font-medium">{profile.company}</span>
              </div>
            )}

            {profile.location && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-slate-700 font-medium">{profile.location}</span>
              </div>
            )}

            {profile.blog && (
              <a
                href={formatUrl(profile.blog)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200/80 text-violet-600 hover:text-violet-700 font-medium transition-colors shadow-2xs"
              >
                <LinkIcon className="w-3.5 h-3.5 text-violet-500" />
                <span className="truncate max-w-[150px]">{profile.blog.replace(/^https?:\/\//, '')}</span>
              </a>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-normal text-slate-500">Joined {joinedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
