import React, { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import videoGames from '../data/videoGames.js';

// Video games listing. Users can search and filter by platform,
// genre, region, condition and format. Only a few sample games
// exist for demonstration so the filter options are derived from that.
export default function VideoGames() {
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('');
  const [genre, setGenre] = useState('');
  const [region, setRegion] = useState('');
  const [condition, setCondition] = useState('');
  const [format, setFormat] = useState('');

  const platforms = Array.from(new Set(videoGames.map((g) => g.platform))).filter(Boolean);
  const genres = Array.from(new Set(videoGames.map((g) => g.genre))).filter(Boolean);
  const regions = Array.from(new Set(videoGames.map((g) => g.region))).filter(Boolean);
  const conditions = Array.from(new Set(videoGames.map((g) => g.condition))).filter(Boolean);
  const formats = Array.from(new Set(videoGames.map((g) => g.format))).filter(Boolean);

  const filtered = videoGames.filter((item) => {
    const q = search.trim().toLowerCase();
    return (
      (!q || item.title.toLowerCase().includes(q)) &&
      (!platform || item.platform === platform) &&
      (!genre || item.genre === genre) &&
      (!region || item.region === region) &&
      (!condition || item.condition === condition) &&
      (!format || item.format === format)
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-2">Video Games</h1>
      <p className="text-gray-600 mb-6">
        Explore retro and next‑gen titles. Filter by platform, genre, region, condition and format.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 md:grid-cols-6 mb-8" aria-label="Filters">
        <div>
          <label className="block text-sm" htmlFor="vg-search">
            Search
          </label>
          <input
            id="vg-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Title..."
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm" htmlFor="vg-platform">
            Platform
          </label>
          <select
            id="vg-platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">All</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm" htmlFor="vg-genre">
            Genre
          </label>
          <select
            id="vg-genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">Any</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm" htmlFor="vg-region">
            Region
          </label>
          <select
            id="vg-region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">Any</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm" htmlFor="vg-condition">
            Condition
          </label>
          <select
            id="vg-condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">Any</option>
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm" htmlFor="vg-format">
            Format
          </label>
          <select
            id="vg-format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">Any</option>
            {formats.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="mb-4 text-gray-600">
        {filtered.length} result{filtered.length === 1 ? '' : 's'}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}