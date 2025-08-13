import React, { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import tradingCards from '../data/tradingCards.js';

// Trading cards listing page. Users can search by title and filter
// by game, rarity and condition. The small sample dataset is
// hard‑coded for demonstration purposes.
export default function TradingCards() {
  const [search, setSearch] = useState('');
  const [game, setGame] = useState('');
  const [rarity, setRarity] = useState('');
  const [condition, setCondition] = useState('');

  // Derive unique filter values from the dataset.
  const games = Array.from(new Set(tradingCards.map((c) => c.game))).filter(Boolean);
  const rarities = Array.from(new Set(tradingCards.map((c) => c.rarity))).filter(Boolean);
  const conditions = Array.from(new Set(tradingCards.map((c) => c.condition))).filter(Boolean);

  const filtered = tradingCards.filter((item) => {
    const q = search.trim().toLowerCase();
    return (
      (!q || item.title.toLowerCase().includes(q)) &&
      (!game || item.game === game) &&
      (!rarity || item.rarity === rarity) &&
      (!condition || item.condition === condition)
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-2">Trading Cards</h1>
      <p className="text-gray-600 mb-6">
        Shop Pokémon, Magic: The Gathering and Yu‑Gi‑Oh! cards by game, rarity and condition.
      </p>
      {/* Filters */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-4 md:grid-cols-4 mb-8"
        aria-label="Filters"
      >
        <div>
          <label className="block text-sm" htmlFor="tc-search">
            Search
          </label>
          <input
            id="tc-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, set, #..."
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm" htmlFor="tc-game">
            Game
          </label>
          <select
            id="tc-game"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">All</option>
            {games.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm" htmlFor="tc-rarity">
            Rarity
          </label>
          <select
            id="tc-rarity"
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">Any</option>
            {rarities.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm" htmlFor="tc-condition">
            Condition
          </label>
          <select
            id="tc-condition"
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
      </form>
      {/* Results bar */}
      <div className="mb-4 text-gray-600">
        {filtered.length} result{filtered.length === 1 ? '' : 's'}
      </div>
      {/* Product grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}