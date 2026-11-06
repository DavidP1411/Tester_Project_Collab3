import { FALLBACK_MOVIES } from '../data/fallbackMovies';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export function getStoredApiKey() {
  return localStorage.getItem('cinepulse_tmdb_key') || import.meta.env.VITE_TMDB_API_KEY || '';
}

export function setStoredApiKey(key) {
  if (key && key.trim()) {
    localStorage.setItem('cinepulse_tmdb_key', key.trim());
  } else {
    localStorage.removeItem('cinepulse_tmdb_key');
  }
}

export function getImageUrl(path, size = 'w500') {
  if (!path) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80';
  if (path.startsWith('http')) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

async function tmdbFetch(endpoint, apiKey, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  const searchParams = new URLSearchParams({
    language: 'en-US',
    ...params,
  });

  const headers = {
    accept: 'application/json',
  };

  // Support both TMDB v3 API Key (32 hex chars) and v4 Read Access Bearer Token
  if (apiKey.length > 45) {
    headers.Authorization = `Bearer ${apiKey}`;
  } else {
    searchParams.set('api_key', apiKey);
  }

  url.search = searchParams.toString();

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    let errMessage = `TMDB Error (${response.status})`;
    try {
      const errData = await response.json();
      if (errData.status_message) errMessage = errData.status_message;
    } catch {
      // ignore json parse failure
    }
    throw new Error(errMessage);
  }
  return response.json();
}

/**
 * Fetch movies from TMDB API if a key is configured, or filter from FALLBACK_MOVIES
 */
export async function fetchMovies({
  apiKey,
  category = 'trending', // 'trending' | 'popular' | 'top_rated' | 'upcoming'
  searchQuery = '',
  genreId = null,
  year = '',
  minRating = 0,
  page = 1,
}) {
  if (!apiKey) {
    // Filter fallback catalog locally so all UI features work seamlessly
    let list = [...FALLBACK_MOVIES];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.overview.toLowerCase().includes(q) ||
          (m.director && m.director.toLowerCase().includes(q))
      );
    }

    if (genreId) {
      list = list.filter((m) => m.genre_ids?.includes(Number(genreId)));
    }

    if (year) {
      list = list.filter((m) => m.release_date?.startsWith(String(year)));
    }

    if (minRating > 0) {
      list = list.filter((m) => m.vote_average >= Number(minRating));
    }

    if (category === 'top_rated') {
      list.sort((a, b) => b.vote_average - a.vote_average);
    } else if (category === 'upcoming') {
      list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }

    return {
      results: list,
      totalPages: 1,
      isLive: false,
    };
  }

  // Live TMDB API query
  let data;
  if (searchQuery.trim()) {
    data = await tmdbFetch('/search/movie', apiKey, {
      query: searchQuery.trim(),
      include_adult: 'false',
      page: String(page),
      ...(year ? { primary_release_year: String(year) } : {}),
    });
  } else if (genreId || year || minRating > 0) {
    const sortByMap = {
      trending: 'popularity.desc',
      popular: 'popularity.desc',
      top_rated: 'vote_average.desc',
      upcoming: 'primary_release_date.desc',
    };
    data = await tmdbFetch('/discover/movie', apiKey, {
      sort_by: sortByMap[category] || 'popularity.desc',
      include_adult: 'false',
      page: String(page),
      'vote_count.gte': category === 'top_rated' ? '300' : '50',
      ...(genreId ? { with_genres: String(genreId) } : {}),
      ...(year ? { primary_release_year: String(year) } : {}),
      ...(minRating > 0 ? { 'vote_average.gte': String(minRating) } : {}),
    });
  } else {
    const endpointMap = {
      trending: '/trending/movie/week',
      popular: '/movie/popular',
      top_rated: '/movie/top_rated',
      upcoming: '/movie/upcoming',
    };
    data = await tmdbFetch(endpointMap[category] || '/trending/movie/week', apiKey, {
      page: String(page),
    });
  }

  let results = data.results || [];

  // Apply client-side filters when using /search/movie (since TMDB search doesn't filter by genre/rating directly)
  if (searchQuery.trim()) {
    if (genreId) {
      results = results.filter((m) => m.genre_ids?.includes(Number(genreId)));
    }
    if (minRating > 0) {
      results = results.filter((m) => (m.vote_average || 0) >= Number(minRating));
    }
  }

  return {
    results,
    totalPages: Math.min(data.total_pages || 1, 500),
    isLive: true,
  };
}

/**
 * Fetch full movie details including YouTube trailer key, cast, runtime, and similar movies
 */
export async function fetchMovieDetails(movieId, apiKey) {
  const fallbackMatch = FALLBACK_MOVIES.find((m) => m.id === Number(movieId));

  if (!apiKey) {
    return fallbackMatch || null;
  }

  const data = await tmdbFetch(`/movie/${movieId}`, apiKey, {
    append_to_response: 'videos,credits,similar',
  });

  // Find official YouTube trailer
  const videos = data.videos?.results || [];
  const trailer =
    videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) ||
    videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
    videos.find((v) => v.site === 'YouTube');

  const directorObj = data.credits?.crew?.find((c) => c.job === 'Director');

  return {
    ...data,
    genre_ids: data.genres ? data.genres.map((g) => g.id) : fallbackMatch?.genre_ids || [],
    trailerKey: trailer?.key || fallbackMatch?.trailerKey || null,
    director: directorObj?.name || fallbackMatch?.director || 'Unknown Director',
    cast: (data.credits?.cast || fallbackMatch?.cast || []).slice(0, 8),
    similar: (data.similar?.results || []).slice(0, 4),
  };
}
