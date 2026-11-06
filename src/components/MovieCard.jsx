import React from 'react';
import { Star, Bookmark, Check, Play, MessageSquare } from 'lucide-react';
import { getImageUrl } from '../services/tmdb';
import { GENRE_MAP } from '../data/fallbackMovies';

export default function MovieCard({
  movie,
  onSelectMovie,
  onToggleWatchlist,
  isInWatchlist,
  userReviewCount = 0,
}) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'TBA';
  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'NR';
  const primaryGenres = (movie.genre_ids || [])
    .map((id) => GENRE_MAP[id])
    .filter(Boolean)
    .slice(0, 2);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700 hover:shadow-2xl hover:shadow-rose-500/10">
      {/* Poster Container */}
      <div
        onClick={() => onSelectMovie(movie, false)}
        className="relative aspect-[2/3] w-full cursor-pointer overflow-hidden bg-slate-800"
      >
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Dark Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Top Left Rating Badge */}
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-slate-950/85 px-2.5 py-1 text-xs font-bold text-amber-400 ring-1 ring-slate-800 backdrop-blur-md">
          <Star className="h-3.5 w-3.5 fill-amber-400" />
          <span>{rating}</span>
        </div>

        {/* Top Right Watchlist Quick Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist(movie);
          }}
          title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border transition-all backdrop-blur-md ${
            isInWatchlist
              ? 'border-amber-500/50 bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
              : 'border-slate-700/80 bg-slate-950/80 text-slate-200 hover:border-rose-500/50 hover:bg-rose-500 hover:text-white'
          }`}
        >
          {isInWatchlist ? (
            <Check className="h-4 w-4 stroke-[2.5]" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>

        {/* Center Play Hover Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full bg-rose-600/95 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-rose-600/40 backdrop-blur-sm">
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Details & Trailer</span>
          </div>
        </div>
      </div>

      {/* Card Footer Details */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-300">{year}</span>
            <div className="flex items-center gap-1.5 truncate">
              {primaryGenres.map((g) => (
                <span
                  key={g}
                  className="rounded bg-slate-800/90 px-1.5 py-0.5 text-[10px] font-medium text-slate-300"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          <h3
            onClick={() => onSelectMovie(movie, false)}
            className="mt-1.5 line-clamp-1 cursor-pointer text-base font-bold text-slate-100 transition-colors group-hover:text-rose-400"
            title={movie.title}
          >
            {movie.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
            {movie.overview || 'No synopsis available for this title.'}
          </p>
        </div>

        {userReviewCount > 0 && (
          <div className="mt-3 flex items-center gap-1.5 border-t border-slate-800/80 pt-2.5 text-[11px] font-medium text-rose-400">
            <MessageSquare className="h-3 w-3" />
            <span>
              {userReviewCount} {userReviewCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
