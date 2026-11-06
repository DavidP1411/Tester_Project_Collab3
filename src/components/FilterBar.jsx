import React from 'react';
import { Flame, Star, Trophy, Calendar, Filter, RotateCcw } from 'lucide-react';
import { GENRES } from '../data/fallbackMovies';

const CATEGORIES = [
  { id: 'trending', label: 'Trending', icon: Flame },
  { id: 'popular', label: 'Popular', icon: Star },
  { id: 'top_rated', label: 'Top Rated', icon: Trophy },
  { id: 'upcoming', label: 'New & Upcoming', icon: Calendar },
];

const YEARS = [
  '',
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2017',
  '2014',
  '2010',
];

const RATINGS = [
  { value: 0, label: 'Any Rating' },
  { value: 7, label: '7.0+ Good' },
  { value: 7.5, label: '7.5+ Great' },
  { value: 8, label: '8.0+ Acclaimed' },
  { value: 8.5, label: '8.5+ Masterpiece' },
];

export default function FilterBar({
  category,
  onCategoryChange,
  selectedGenre,
  onGenreChange,
  selectedYear,
  onYearChange,
  minRating,
  onRatingChange,
  onResetFilters,
}) {
  const hasActiveFilters = Boolean(selectedGenre || selectedYear || minRating > 0);

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 sm:p-5 backdrop-blur-sm">
      {/* Top Row: Category Tabs + Dropdown Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-rose-400'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Year & Minimum Rating Selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Filter className="h-3.5 w-3.5 text-slate-500" />
            <span>Filters:</span>
          </div>

          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            aria-label="Filter by release year"
            className="rounded-xl border border-slate-700/80 bg-slate-900 px-3 py-1.5 text-xs sm:text-sm text-slate-200 focus:border-rose-500 focus:outline-none"
          >
            <option value="">All Years</option>
            {YEARS.filter(Boolean).map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>

          <select
            value={minRating}
            onChange={(e) => onRatingChange(Number(e.target.value))}
            aria-label="Filter by minimum rating"
            className="rounded-xl border border-slate-700/80 bg-slate-900 px-3 py-1.5 text-xs sm:text-sm text-slate-200 focus:border-rose-500 focus:outline-none"
          >
            {RATINGS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/20"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Genre Horizontal Pill Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => onGenreChange(null)}
          className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            selectedGenre === null
              ? 'bg-slate-100 text-slate-950 font-semibold'
              : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          All Genres
        </button>
        {GENRES.map((genre) => {
          const active = selectedGenre === genre.id;
          return (
            <button
              key={genre.id}
              onClick={() => onGenreChange(active ? null : genre.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                active
                  ? 'bg-rose-500/20 text-rose-300 ring-1 ring-inset ring-rose-500/50 font-semibold'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
