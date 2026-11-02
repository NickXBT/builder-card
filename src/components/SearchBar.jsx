import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Bright, Elegant & Minimalist SearchBar Component
 * 
 * Features:
 * - Pure white card with thin light-grey border
 * - Soft pastel focus ring
 * - Crisp charcoal typography
 * - Delicate sample pills
 */
export default function SearchBar({ onSearch, isLoading }) {
  const [usernameInput, setUsernameInput] = useState('');

  // Sample developer accounts for instant live testing
  const sampleUsers = ['shadcn', 'gaearon', 'torvalds', 'yyx990803'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = usernameInput.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  const handleSelectSample = (sample) => {
    setUsernameInput(sample);
    onSearch(sample);
  };

  const handleClear = () => {
    setUsernameInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3.5">
      <form onSubmit={handleSubmit} className="relative">
        <motion.div 
          className="relative flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-slate-300 focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-50 transition-all duration-200"
          whileHover={{ y: -1 }}
          transition={{ duration: 0.15 }}
        >
          {/* Search Icon */}
          <div className="pl-4.5 pr-2 text-slate-400 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-violet-500/80" />
          </div>

          {/* Text Input */}
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Enter GitHub username or profile link..."
            disabled={isLoading}
            className="w-full py-3.5 pr-32 bg-transparent text-slate-900 placeholder-slate-400 font-normal text-sm sm:text-base focus:outline-none"
          />

          {/* Clear button */}
          {usernameInput && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 mr-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Search Button: Soft Pastel Violet with gentle hover */}
          <motion.button
            type="submit"
            disabled={isLoading || !usernameInput.trim()}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="mr-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-medium text-sm rounded-xl transition-all shadow-[0_2px_10px_rgba(124,58,237,0.15)] flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span>Searching...</span>
            ) : (
              <>
                <span>Search</span>
                <ArrowRight className="w-4 h-4 text-violet-200" />
              </>
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* Suggested Quick Select Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
        <span className="flex items-center gap-1 font-medium text-slate-600">
          <Sparkles className="w-3.5 h-3.5 text-violet-500" /> Try:
        </span>
        {sampleUsers.map((user) => (
          <button
            key={user}
            type="button"
            onClick={() => handleSelectSample(user)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full bg-slate-50 hover:bg-violet-50 hover:text-violet-700 text-slate-600 border border-slate-200/70 hover:border-violet-200 transition-all font-mono font-medium"
          >
            @{user}
          </button>
        ))}
      </div>
    </div>
  );
}
