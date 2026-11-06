import React, { useState } from 'react';
import { Key, X, CheckCircle2, ExternalLink, Sparkles, Trash2 } from 'lucide-react';

export default function ApiKeyModal({ currentKey, onSaveKey, onClose }) {
  const [inputKey, setInputKey] = useState(currentKey || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveKey(inputKey.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Live TMDB API Integration</h2>
            <p className="text-xs text-slate-400">
              Connect directly to The Movie Database (TMDB) live catalog
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              TMDB API Key (v3) or Read Access Token (v4)
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Paste your TMDB API key here..."
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 text-xs leading-relaxed text-slate-400 space-y-2">
            <p className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Sparkles className="h-4 w-4 text-amber-400" />
              How it works:
            </p>
            <p>
              • With a key saved, CinePulse fetches live trending, popular, top-rated, and upcoming movies, plus live search, cast, and official YouTube trailers from TMDB.
            </p>
            <p>
              • Your key is stored locally in your browser&apos;s <code className="text-rose-300">localStorage</code> (or can be set via <code className="text-rose-300">VITE_TMDB_API_KEY</code> in a <code className="text-rose-300">.env</code> file).
            </p>
            <a
              href="https://www.themoviedb.org/settings/api"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-rose-400 hover:text-rose-300 pt-1"
            >
              Get a free TMDB API key
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {currentKey ? (
              <button
                type="button"
                onClick={() => {
                  onSaveKey('');
                  onClose();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-rose-500/40 hover:text-rose-300"
              >
                <Trash2 className="h-4 w-4" />
                Remove Key (Use Curated Mode)
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition hover:bg-rose-500"
              >
                <CheckCircle2 className="h-4 w-4" />
                Save & Connect
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
