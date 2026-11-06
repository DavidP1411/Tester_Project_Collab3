# CinePulse — React Movie Discovery & Watchlist Site

A modern movie discovery web application built with **Vite + React + JavaScript + Tailwind CSS**.

## Features

- **Live TMDB API Integration (+ Instant Curated Fallback)**:
  - Connect your free [TMDB API Key](https://www.themoviedb.org/settings/api) (v3 key or v4 Read Access Token) via the in-app **API Key** modal or via `.env` (`VITE_TMDB_API_KEY`).
  - Works immediately out of the box with a rich curated catalog if no API key is entered yet.
- **Search & Multi-Faceted Filtering**:
  - Real-time debounced search by movie title, director, or keywords.
  - Browse by **Trending**, **Popular**, **Top Rated**, and **New & Upcoming**.
  - Filter by **Genre**, **Release Year**, and **Minimum Rating**.
- **Movie Details Modal with Trailer & Cast**:
  - Embedded official YouTube trailer player.
  - Cast member cards, director info, runtime, genres, and similar movie recommendations.
- **Persistent Watchlist**:
  - Add or remove movies from your Watchlist from any card, hero banner, or modal, persisted in `localStorage`.
- **Community Reviews & Interactive Star Ratings**:
  - Rate movies from 1 to 5 stars and post written reviews, persisted in `localStorage`.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **(Optional) Configure TMDB API Key:**
   Copy `.env.example` to `.env` and add your TMDB key, or enter it anytime directly inside the web app by clicking the **API Key** button in the top navigation bar.
   ```bash
   cp .env.example .env
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
