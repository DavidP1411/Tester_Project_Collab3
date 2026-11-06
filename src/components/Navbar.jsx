import React from 'react';
import { Film, Search, Bookmark, Key, Sparkles, X } from 'lucide-react';

export default function Navbar({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  watchlistCount,
  isLiveApi,
  onOpenApiModal,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onTabChange('discover')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 shadow-lg shadow-rose-500/25 transition-transform group-hover:scale-105">
              <Film className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-white via-slate-100 to-rose-300 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
                CinePulse
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-widest text-slate-400">
                Movie Discovery
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex">
            <button
              onClick={() => onTabChange('discover')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                activeTab === 'discover'
                  ? 'bg-slate-800/90 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <Sparkles className="h-4 w-4 text-rose-500" />
              Discover
            </button>

            <button
              onClick={() => onTabChange('watchlist')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                activeTab === 'watchlist'
                  ? 'bg-slate-800/90 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <Bookmark className="h-4 w-4 text-amber-400" />
              Watchlist
              {watchlistCount > 0 && (
                <span className="ml-0.5 rounded-full bg-rose-500/20 px-2 py-0.5 text-xs font-semibold text-rose-400 ring-1 ring-inset ring-rose-500/30">
                  {watchlistCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Search Input & API Status */}
        <div className="flex flex-1 items-center justify-end gap-3 sm:max-w-md lg:max-w-lg">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeTab !== 'discover') onTabChange('discover');
              }}
              placeholder="Search movies, directors, keywords..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2 pl-10 pr-9 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-rose-500/60 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Watchlist Button */}
          <button
            onClick={() => onTabChange(activeTab === 'watchlist' ? 'discover' : 'watchlist')}
            className={`relative flex items-center justify-center rounded-xl border p-2.5 md:hidden ${
              activeTab === 'watchlist'
                ? 'border-rose-500/50 bg-rose-500/10 text-rose-400'
                : 'border-slate-800 bg-slate-900 text-slate-300'
            }`}
            title="Watchlist"
          >
            <Bookmark className="h-4 w-4" />
            {watchlistCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* TMDB API Key Status Button */}
          <button
            onClick={onOpenApiModal}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
              isLiveApi
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
            }`}
            title="Configure TMDB Live API Key"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isLiveApi ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <Key className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isLiveApi ? 'TMDB Live' : 'API Key'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
