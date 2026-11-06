import React, { useEffect, useState } from 'react';
import {
  X,
  Star,
  Calendar,
  Clock,
  Bookmark,
  Check,
  Play,
  User,
  MessageSquare,
  Send,
  Trash2,
  Film,
  Loader2,
} from 'lucide-react';
import { fetchMovieDetails, getImageUrl } from '../services/tmdb';
import { GENRE_MAP } from '../data/fallbackMovies';

export default function MovieModal({
  movie,
  apiKey,
  autoPlayTrailer = false,
  onClose,
  onToggleWatchlist,
  isInWatchlist,
  reviews = [],
  onAddReview,
  onDeleteReview,
  onSelectMovie,
}) {
  const [details, setDetails] = useState(movie);
  const [loading, setLoading] = useState(false);
  const [showTrailer, setShowTrailer] = useState(autoPlayTrailer);

  // Review Form State
  const [author, setAuthor] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let isMounted = true;
    setDetails(movie);
    setShowTrailer(autoPlayTrailer);

    async function loadDetails() {
      setLoading(true);
      try {
        const full = await fetchMovieDetails(movie.id, apiKey);
        if (isMounted && full) {
          setDetails((prev) => ({ ...prev, ...full }));
        }
      } catch {
        // Keep base movie details if extra call fails
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDetails();
    return () => {
      isMounted = false;
    };
  }, [movie, apiKey, autoPlayTrailer]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!details) return null;

  const year = details.release_date ? details.release_date.slice(0, 4) : 'TBA';
  const rating = details.vote_average ? Number(details.vote_average).toFixed(1) : 'NR';
  const genres =
    details.genres?.map((g) => g.name) ||
    (details.genre_ids || []).map((id) => GENRE_MAP[id]).filter(Boolean);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onAddReview(details.id, {
      id: `rev-${Date.now()}`,
      author: author.trim() || 'Movie Buff',
      rating: userRating,
      date: new Date().toISOString().slice(0, 10),
      comment: comment.trim(),
    });
    setComment('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 sm:p-6 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className=" sticky top-4 float-right mr-4 mt-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950/80 text-slate-300 backdrop-blur-md transition hover:bg-rose-600 hover:border-rose-500 hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Top Media Area: Trailer Embed OR Backdrop Banner */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
          {showTrailer && details.trailerKey ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${details.trailerKey}?autoplay=1&rel=0`}
              title={`${details.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={getImageUrl(details.backdrop_path || details.poster_path, 'original')}
                alt={details.title}
                className="h-full w-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

              {details.trailerKey && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="group flex items-center gap-3 rounded-full bg-rose-600/95 px-6 py-3.5 text-sm font-bold text-white shadow-2xl shadow-rose-600/50 transition-all hover:scale-105 hover:bg-rose-500"
                  >
                    <Play className="h-5 w-5 fill-white" />
                    <span>Play Official Trailer</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Main Details Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Header Info */}
          <div className="flex flex-col gap-6 sm:flex-row">
            {/* Poster Thumbnail */}
            <img
              src={getImageUrl(details.poster_path, 'w500')}
              alt={details.title}
              className="hidden sm:block h-52 w-36 shrink-0 rounded-2xl border border-slate-700/80 object-cover shadow-xl -mt-20 z-10 bg-slate-800"
            />

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="flex items-center gap-1 rounded-lg bg-amber-500/15 px-2.5 py-1 text-amber-400 ring-1 ring-amber-500/30">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  {rating} TMDB
                </span>
                <span className="flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-slate-300">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {year}
                </span>
                {details.runtime && (
                  <span className="flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-slate-300">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {details.runtime} min
                  </span>
                )}
                {loading && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Loading details...
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
                {details.title}
              </h2>

              {details.tagline && (
                <p className="text-sm italic text-rose-300/90">&ldquo;{details.tagline}&rdquo;</p>
              )}

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {genres.map((g) => (
                  <span
                    key={g}
                    className="rounded-lg bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-slate-300"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {details.trailerKey && (
                  <button
                    onClick={() => setShowTrailer((prev) => !prev)}
                    className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition hover:bg-rose-500"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    {showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
                  </button>
                )}

                <button
                  onClick={() => onToggleWatchlist(details)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-semibold transition ${
                    isInWatchlist
                      ? 'border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
                      : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {isInWatchlist ? (
                    <>
                      <Check className="h-4 w-4 text-amber-400" />
                      Saved in Watchlist
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

          {/* Synopsis & Director */}
          <div className="space-y-3 border-t border-slate-800/80 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Synopsis
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-200">
              {details.overview || 'No overview available.'}
            </p>
            {details.director && (
              <p className="text-xs sm:text-sm text-slate-400 pt-1">
                Directed by <span className="font-semibold text-slate-200">{details.director}</span>
              </p>
            )}
          </div>

          {/* Cast Section */}
          {details.cast && details.cast.length > 0 && (
            <div className="space-y-4 border-t border-slate-800/80 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Top Cast
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {details.cast.map((actor) => (
                  <div
                    key={actor.id || actor.name}
                    className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5"
                  >
                    {actor.profile_path ? (
                      <img
                        src={getImageUrl(actor.profile_path, 'w185')}
                        alt={actor.name}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover bg-slate-800"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-slate-100">{actor.name}</p>
                      <p className="truncate text-[11px] text-slate-400">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Movies (when available via TMDB API) */}
          {details.similar && details.similar.length > 0 && (
            <div className="space-y-4 border-t border-slate-800/80 pt-6">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
                <Film className="h-4 w-4 text-rose-500" />
                Similar Recommendations
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {details.similar.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectMovie(sim, false)}
                    className="group cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 transition hover:border-rose-500/40"
                  >
                    <div className="aspect-[2/3] w-full overflow-hidden bg-slate-800">
                      <img
                        src={getImageUrl(sim.poster_path, 'w342')}
                        alt={sim.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-2.5">
                      <p className="truncate text-xs font-bold text-slate-200 group-hover:text-rose-400">
                        {sim.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        ★ {sim.vote_average ? Number(sim.vote_average).toFixed(1) : 'NR'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Reviews & Star Ratings Section */}
          <div className="space-y-6 border-t border-slate-800/80 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
                <MessageSquare className="h-4 w-4 text-rose-500" />
                Community Reviews & Ratings ({reviews.length})
              </h3>
            </div>

            {/* Write a Review Form */}
            <form
              onSubmit={handleReviewSubmit}
              className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full sm:w-64 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                />

                {/* Interactive 5-Star Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="mr-1 text-xs font-medium text-slate-400">Your Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating || userRating) >= star;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setUserRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
                        aria-label={`Rate ${star} out of 5 stars`}
                      >
                        <Star
                          className={`h-5 w-5 ${
                            active
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-1 text-xs font-bold text-amber-400">{userRating}/5</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={`Share your thoughts on ${details.title}...`}
                  required
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 self-end rounded-xl bg-rose-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-rose-600/20 transition hover:bg-rose-500"
                >
                  <Send className="h-4 w-4" />
                  Post Review
                </button>
              </div>
            </form>

            {/* Reviews List */}
            {reviews.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-500">
                No reviews yet for this movie. Be the first to rate and review it!
              </p>
            ) : (
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-sm font-bold text-slate-100">{rev.author}</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`h-3.5 w-3.5 ${
                                s <= rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">{rev.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                        {rev.comment}
                      </p>
                    </div>

                    <button
                      onClick={() => onDeleteReview(details.id, rev.id)}
                      className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-rose-400"
                      title="Delete review"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
