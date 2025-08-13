import React, { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import tradingCards from '../data/tradingCards.js';
import comicBooks from '../data/comicBooks.js';
import videoGames from '../data/videoGames.js';

// The SearchResults page allows users to explore the entire
// SuperTrade catalogue. It combines items from all three
// categories (trading cards, comic books and video games) into a
// single list, then filters and sorts that list based on user
// input. Users can search by text, constrain results by category
// and price range, and choose an ordering. Because this page
// performs all filtering client‑side, there is no need for a
// back‑end service or API.
export default function SearchResults() {
  // Build a unified array of all items. Each item is tagged
  // with a `cat` property identifying its category. This makes
  // it easy to apply category filters later on. We spread the
  // original items to avoid mutating the imported modules.
  const allItems = [
    ...tradingCards.map((item) => ({ ...item, cat: 'cards' })),
    ...comicBooks.map((item) => ({ ...item, cat: 'comics' })),
    ...videoGames.map((item) => ({ ...item, cat: 'games' })),
  ];

  // UI state for search query, selected categories, price range
  // and sort order. When any of these change the filtered list
  // updates automatically.
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sort, setSort] = useState('relevance');

  // Toggle a category checkbox. If the category is already
  // selected it will be removed; otherwise it will be added.
  const toggleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Compute the filtered and sorted list of items. We apply
  // filters for text, category and price first, then sort the
  // results according to the selected option.
  let filtered = allItems.filter((item) => {
    const title = item.title.toLowerCase();
    const q = query.trim().toLowerCase();
    const matchQuery = !q || title.includes(q);
    const matchCat = categories.length === 0 || categories.includes(item.cat);
    const min = priceMin === '' ? null : parseFloat(priceMin);
    const max = priceMax === '' ? null : parseFloat(priceMax);
    const matchMin = min === null || item.price >= min;
    const matchMax = max === null || item.price <= max;
    return matchQuery && matchCat && matchMin && matchMax;
  });

  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'title-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Clear all filters. Resets state to defaults.
  const handleClear = () => {
    setQuery('');
    setCategories([]);
    setPriceMin('');
    setPriceMax('');
    setSort('relevance');
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {/* Search and sort controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <input
          type="search"
          className="w-full md:w-1/2 px-3 py-2 border rounded-md focus:outline-none"
          placeholder="Search all items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 px-3 py-2 border rounded-md"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title: A–Z</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar filters */}
        <aside className="space-y-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          {/* Category filter */}
          <div>
            <strong className="block mb-1">Category</strong>
            <label className="block text-sm capitalize">
              <input
                type="checkbox"
                className="mr-2"
                checked={categories.includes('cards')}
                onChange={() => toggleCategory('cards')}
              />
              Trading Cards
            </label>
            <label className="block text-sm capitalize">
              <input
                type="checkbox"
                className="mr-2"
                checked={categories.includes('comics')}
                onChange={() => toggleCategory('comics')}
              />
              Comic Books
            </label>
            <label className="block text-sm capitalize">
              <input
                type="checkbox"
                className="mr-2"
                checked={categories.includes('games')}
                onChange={() => toggleCategory('games')}
              />
              Video Games
            </label>
          </div>
          {/* Price filter */}
          <div>
            <strong className="block mb-1">Price</strong>
            <div className="flex gap-2">
              <input
                type="number"
                className="w-full px-2 py-1 border rounded-md"
                placeholder="Min"
                min="0"
                step="0.01"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
              />
              <input
                type="number"
                className="w-full px-2 py-1 border rounded-md"
                placeholder="Max"
                min="0"
                step="0.01"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
              onClick={handleClear}
              type="button"
            >
              Clear
            </button>
          </div>
        </aside>
        {/* Results grid */}
        <div>
          {filtered.length === 0 ? (
            <p>No items match your criteria.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}