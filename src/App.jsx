import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Github, 
  Sparkles, 
  Flame, 
  FolderGit2, 
  Terminal,
  ExternalLink,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepositoryCard from './components/RepositoryCard';
import LanguageStats from './components/LanguageStats';
import ActivityTimeline from './components/ActivityTimeline';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { 
  fetchUserProfile, 
  fetchUserRepos, 
  fetchUserEvents, 
  calculateLanguageStats,
  cleanUsername 
} from './services/githubApi';

/**
 * Bright, Elegant & Minimalist Builder Card Application
 * 
 * Aesthetic:
 * - 85% pure white & light surfaces (#FFFFFF, #FAF8FF)
 * - 15% soft pastel accents (soft violet #7C3AED & powder blue #3B82F6)
 * - Charcoal typography (#0F172A)
 * - Thin light-grey borders (border-slate-200/80)
 * - Subtle, diffuse shadows
 */
export default function App() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearch = async (rawInput) => {
    const username = cleanUsername(rawInput);
    if (!username) return;

    setIsLoading(true);
    setError(null);
    setCurrentQuery(username);

    try {
      const profileData = await fetchUserProfile(username);
      setProfile(profileData);

      const [reposResult, eventsResult] = await Promise.allSettled([
        fetchUserRepos(username),
        fetchUserEvents(username),
      ]);

      if (reposResult.status === 'fulfilled') {
        const repoList = reposResult.value;
        setRepos(repoList);
        const languageStats = calculateLanguageStats(repoList);
        setLanguages(languageStats);
      } else {
        setRepos([]);
        setLanguages([]);
      }

      if (eventsResult.status === 'fulfilled') {
        setEvents(eventsResult.value);
      } else {
        setEvents([]);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while fetching data.');
      setProfile(null);
      setRepos([]);
      setLanguages([]);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('shadcn');
  }, []);

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  const reposWithLanguageCount = repos.filter((r) => r.language).length;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-x-hidden selection:bg-violet-100 selection:text-violet-900">
      {/* Floating Gentle Pastel Ambient Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl opacity-60"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-blue-100/35 rounded-full blur-3xl opacity-50"
        />
      </div>

      {/* Clean Minimalist Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
              <Code2 className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 tracking-tight">Builder Card</span>
            </div>
          </div>

          {/* Header Action */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub API</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          {/* Minimalist Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50/70 border border-violet-100 text-violet-700 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span>Developer Snapshot</span>
          </div>

          {/* Crisp Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Your GitHub. <br className="hidden sm:inline" />
            <span className="text-violet-600">
              Your Story.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
            Turn your GitHub activity into a beautiful snapshot of your developer journey.
          </p>

          {/* Minimalist Search Bar */}
          <div className="pt-2">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </motion.div>

        {/* Dynamic Display */}
        {isLoading && <Loading />}

        {error && !isLoading && (
          <ErrorMessage 
            message={error} 
            onRetry={() => handleSearch(currentQuery)} 
          />
        )}

        {/* Profile Dashboard */}
        <AnimatePresence mode="wait">
          {profile && !isLoading && (
            <motion.div
              key={profile.login}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-8"
            >
              {/* Primary Profile Card */}
              <ProfileCard profile={profile} />

              {/* Grid Layout: Left Column (Languages & Timeline) | Right Column (Top Repositories) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Languages */}
                  <LanguageStats
                    languages={languages}
                    totalReposWithLanguage={reposWithLanguageCount}
                  />

                  {/* Activity Timeline */}
                  <ActivityTimeline events={events} />
                </div>

                {/* Right Column: Top Starred Repositories (Takes 2 cols on lg) */}
                <div className="lg:col-span-2 space-y-3.5">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-lg bg-amber-50 text-amber-500">
                        <Flame className="w-4 h-4" />
                      </div>
                      <h2 className="text-lg font-bold text-slate-900">Top Repositories</h2>
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-400">
                      Top {topRepos.length} of {repos.length} repos
                    </span>
                  </div>

                  {topRepos.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3.5">
                      {topRepos.map((repo) => (
                        <RepositoryCard key={repo.id} repo={repo} />
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 rounded-3xl bg-white border border-slate-200/80 text-center space-y-2 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                      <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-slate-700 font-medium text-sm">No public repositories found</p>
                      <p className="text-xs text-slate-400">
                        This developer has not published any public repositories yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-100 bg-white py-8 mt-12 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-violet-500" />
            <span>
              Built with <strong className="text-slate-600 font-medium">React</strong>,{' '}
              <strong className="text-slate-600 font-medium">Framer Motion</strong> &{' '}
              <strong className="text-slate-600 font-medium">Tailwind CSS</strong>
            </span>
          </div>

          <div>
            <span className="text-slate-400">
              Designed for modern developer portfolios
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
