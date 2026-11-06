import React from 'react';
import { Play, Info, Bookmark, Check, Star, Calendar } from 'lucide-react';
import { getImageUrl } from '../services/tmdb';
import { GENRE_MAP } from '../data/fallbackMovies';

export default function HeroBanner({
  movie,
  onSelectMovie,
  onToggleWatchlist,
  isInWatchlist,
}) {
  if (!movie) return null;

  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';
  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'NR';
  const genres = (movie.genre_ids || [])
    .map((id) => GENRE_MAP[id])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900 shadow-2xl">
      {/* Backdrop Image */}
      <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] w-full">
        <img
          src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
          alt={movie.title}
          className="h-full w-full object-cover object-center brightness-75 transition-transform duration-700 hover:scale-105"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
        <div className="max-w-2xl space-y-4">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <span className="rounded-full bg-rose-500 px-3 py-1 uppercase tracking-wider text-white shadow-sm shadow-rose-500/40">
              Featured Spotlight
            </span>
            <span className="flex items-center gap-1 rounded-full bg-slate-900/90 px-3 py-1 text-amber-400 ring-1 ring-slate-700/80 backdrop-blur-md">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              {rating}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-slate-900/90 px-3 py-1 text-slate-300 ring-1 ring-slate-700/80 backdrop-blur-md">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {year}
            </span>
            {genres.map((g) => (
              <span
                key={g}
                className="rounded-full bg-slate-800/80 px-3 py-1 text-slate-200 backdrop-blur-md"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Title & Overview */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="text-sm font-medium italic text-rose-300/90 sm:text-base">
              &ldquo;{movie.tagline}&rdquo;
            </p>
          )}

          <p className="line-clamp-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            {movie.overview}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectMovie(movie, true)}
              className="flex items-center gap-2.5 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="h-4 w-4 fill-white" />
              Watch Trailer & Details
            </button>

            <button
              onClick={() => onSelectMovie(movie, false)}
              className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all hover:border-slate-600 hover:bg-slate-800"
            >
              <Info className="h-4 w-4 text-slate-300" />
              More Info
            </button>

            <button
              onClick={() => onToggleWatchlist(movie)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold backdrop-blur-md transition-all ${
                isInWatchlist
                  ? 'border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
                  : 'border-slate-700/80 bg-slate-900/80 text-slate-200 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              {isInWatchlist ? (
                <>
                  <Check className="h-4 w-4 text-amber-400" />
                  In Watchlist
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  Add to Watchlist
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
