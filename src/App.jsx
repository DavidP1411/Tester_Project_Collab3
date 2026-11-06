import React, { useState, useEffect, useMemo } from 'react';
import {
  Film,
  Bookmark,
  AlertCircle,
  Key,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
} from 'lucide-react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import ApiKeyModal from './components/ApiKeyModal';
import { fetchMovies, getStoredApiKey, setStoredApiKey } from './services/tmdb';
import { INITIAL_REVIEWS } from './data/fallbackMovies';

export default function App() {
  // Navigation & API Key State
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'watchlist'
  const [apiKey, setApiKey] = useState(() => getStoredApiKey());
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Filter & Search State
  const [category, setCategory] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);

  // Movie Data State
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected Movie Modal State
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [autoPlayTrailer, setAutoPlayTrailer] = useState(false);

  // Watchlist persisted in localStorage
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('cinepulse_watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User Reviews persisted in localStorage
  const [reviewsByMovie, setReviewsByMovie] = useState(() => {
    try {
      const saved = localStorage.getItem('cinepulse_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  useEffect(() => {
    localStorage.setItem('cinepulse_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('cinepulse_reviews', JSON.stringify(reviewsByMovie));
  }, [reviewsByMovie]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 320);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [category, selectedGenre, selectedYear, minRating, apiKey]);

  // Fetch Movies
  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchMovies({
          apiKey,
          category,
          searchQuery: debouncedSearch,
          genreId: selectedGenre,
          year: selectedYear,
          minRating,
          page,
        });
        if (isMounted) {
          setMovies(res.results);
          setTotalPages(res.totalPages);
          setIsLive(res.isLive);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch movies from TMDB.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [apiKey, category, debouncedSearch, selectedGenre, selectedYear, minRating, page]);

  // Featured Movie for Hero Banner
  const featuredMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;
    return movies.find((m) => m.backdrop_path) || movies[0];
  }, [movies]);

  const watchlistIds = useMemo(
    () => new Set(watchlist.map((m) => m.id)),
    [watchlist]
  );

  const handleToggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [movie, ...prev];
    });
  };

  const handleSaveApiKey = (newKey) => {
    setStoredApiKey(newKey);
    setApiKey(newKey);
  };

  const handleAddReview = (movieId, reviewObj) => {
    setReviewsByMovie((prev) => {
      const existing = prev[movieId] || [];
      return {
        ...prev,
        [movieId]: [reviewObj, ...existing],
      };
    });
  };

  const handleDeleteReview = (movieId, reviewId) => {
    setReviewsByMovie((prev) => {
      const existing = prev[movieId] || [];
      return {
        ...prev,
        [movieId]: existing.filter((r) => r.id !== reviewId),
      };
    });
  };

  const handleResetFilters = () => {
    setSelectedGenre(null);
    setSelectedYear('');
    setMinRating(0);
    setSearchQuery('');
    setPage(1);
  };

  const handleOpenMovie = (movie, playTrailer = false) => {
    setSelectedMovie(movie);
    setAutoPlayTrailer(playTrailer);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        watchlistCount={watchlist.length}
        isLiveApi={isLive && Boolean(apiKey)}
        onOpenApiModal={() => setIsApiModalOpen(true)}
      />

      {/* API Status Banner when no live key is set */}
      {!apiKey && (
        <div className="border-b border-amber-500/20 bg-amber-500/5 px-4 py-2.5">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 text-xs text-amber-200/90 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <Key className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>
                Currently browsing the <strong>Curated Showcase Catalog</strong>. Connect a free{' '}
                <strong>TMDB API Key</strong> for live search &amp; 800,000+ movies!
              </span>
            </div>
            <button
              onClick={() => setIsApiModalOpen(true)}
              className="rounded-lg bg-amber-500/20 px-2.5 py-1 font-semibold text-amber-300 ring-1 ring-amber-500/40 transition hover:bg-amber-500/30"
            >
              Connect TMDB Key →
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {activeTab === 'discover' ? (
          <>
            {/* Show Hero Spotlight when not actively searching */}
            {!debouncedSearch && !selectedGenre && !selectedYear && minRating === 0 && page === 1 && featuredMovie && (
              <HeroBanner
                movie={featuredMovie}
                onSelectMovie={handleOpenMovie}
                onToggleWatchlist={handleToggleWatchlist}
                isInWatchlist={watchlistIds.has(featuredMovie.id)}
              />
            )}

            {/* Filter & Category Bar */}
            <FilterBar
              category={category}
              onCategoryChange={setCategory}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              minRating={minRating}
              onRatingChange={setMinRating}
              onResetFilters={handleResetFilters}
            />

            {/* Error Notice */}
            {error && (
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
                  <div>
                    <p className="font-semibold">TMDB API Error: {error}</p>
                    <p className="text-xs text-rose-300/80">
                      Please verify your TMDB API key or switch back to Curated Mode.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsApiModalOpen(true)}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500"
                >
                  Update API Key
                </button>
              </div>
            )}

            {/* Section Heading */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                {debouncedSearch
                  ? `Search Results for "${debouncedSearch}"`
                  : category === 'trending'
                  ? 'Trending Movies'
                  : category === 'popular'
                  ? 'Popular Movies'
                  : category === 'top_rated'
                  ? 'Top Rated Classics & Hits'
                  : 'New & Upcoming Releases'}
              </h2>
              <span className="text-xs font-medium text-slate-400">
                Showing {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
              </span>
            </div>

            {/* Movie Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <Loader2 className="h-10 w-10 animate-spin text-rose-500" />
                <p className="mt-3 text-sm font-medium">Loading movies...</p>
              </div>
            ) : movies.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 py-20 text-center px-4">
                <Film className="h-12 w-12 text-slate-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-200">No movies matched your filters</h3>
                <p className="mt-1 max-w-md text-xs sm:text-sm text-slate-400">
                  Try clearing your search query, selecting a different release year, or lowering the minimum rating filter.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelectMovie={handleOpenMovie}
                    onToggleWatchlist={handleToggleWatchlist}
                    isInWatchlist={watchlistIds.has(movie.id)}
                    userReviewCount={(reviewsByMovie[movie.id] || []).length}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls (for Live TMDB API) */}
            {totalPages > 1 && !loading && (
              <div className="flex items-center justify-center gap-4 pt-6">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <span className="text-xs font-semibold text-slate-400">
                  Page <span className="text-white">{page}</span> of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Watchlist View */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h1 className="flex items-center gap-2.5 text-2xl font-extrabold text-white sm:text-3xl">
                  <Bookmark className="h-7 w-7 text-amber-400 fill-amber-400" />
                  My Watchlist
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                  Movies saved to your browser&apos;s local storage ({watchlist.length}{' '}
                  {watchlist.length === 1 ? 'title' : 'titles'})
                </p>
              </div>

              {watchlist.length > 0 && (
                <button
                  onClick={() => setWatchlist([])}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-400 transition hover:border-rose-500/40 hover:text-rose-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear Watchlist
                </button>
              )}
            </div>

            {watchlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 py-24 text-center px-4">
                <Bookmark className="h-12 w-12 text-slate-600" />
                <h3 className="mt-4 text-lg font-bold text-slate-200">Your Watchlist is empty</h3>
                <p className="mt-1 max-w-md text-xs sm:text-sm text-slate-400">
                  Click the bookmark icon on any movie card or details page to save movies you want to watch later.
                </p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="mt-5 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500"
                >
                  Explore Movies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
                {watchlist.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelectMovie={handleOpenMovie}
                    onToggleWatchlist={handleToggleWatchlist}
                    isInWatchlist={true}
                    userReviewCount={(reviewsByMovie[movie.id] || []).length}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-rose-500" />
            <span className="font-bold text-slate-300">CinePulse</span>
            <span>— React + Vite + Tailwind CSS Movie Platform</span>
          </div>
          <p>
            Powered by TMDB API &bull; Watchlist &amp; Reviews saved in LocalStorage
          </p>
        </div>
      </footer>

      {/* Movie Details & Trailer & Reviews Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          apiKey={apiKey}
          autoPlayTrailer={autoPlayTrailer}
          onClose={() => setSelectedMovie(null)}
          onToggleWatchlist={handleToggleWatchlist}
          isInWatchlist={watchlistIds.has(selectedMovie.id)}
          reviews={reviewsByMovie[selectedMovie.id] || []}
          onAddReview={handleAddReview}
          onDeleteReview={handleDeleteReview}
          onSelectMovie={handleOpenMovie}
        />
      )}

      {/* TMDB API Key Configuration Modal */}
      {isApiModalOpen && (
        <ApiKeyModal
          currentKey={apiKey}
          onSaveKey={handleSaveApiKey}
          onClose={() => setIsApiModalOpen(false)}
        />
      )}
    </div>
  );
}
