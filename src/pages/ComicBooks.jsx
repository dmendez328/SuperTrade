import React, { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import comicBooks from '../data/comicBooks.js';

// Comic books listing page. Allows users to search and filter by
// publisher, era, grade and condition. Only a few sample entries
// exist for demonstration purposes.
export default function ComicBooks() {
  const [search, setSearch] = useState('');
  const [publisher, setPublisher] = useState('');
  const [era, setEra] = useState('');
  const [grade, setGrade] = useState('');
  const [condition, setCondition] = useState('');

  const publishers = Array.from(new Set(comicBooks.map((c) => c.publisher))).filter(Boolean);
  const eras = Array.from(new Set(comicBooks.map((c) => c.era))).filter(Boolean);
  const grades = Array.from(new Set(comicBooks.map((c) => c.grade))).filter(Boolean);
  const conditions = Array.from(new Set(comicBooks.map((c) => c.condition))).filter(Boolean);

  const filtered = comicBooks.filter((item) => {
    const q = search.trim().toLowerCase();
    return (
      (!q || item.title.toLowerCase().includes(q)) &&
      (!publisher || item.publisher === publisher) &&
      (!era || item.era === era) &&
      (!grade || item.grade === grade) &&
      (!condition || item.condition === condition)
    );
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-2">Comic Books</h1>
      <p className="text-gray-600 mb-6">
        Browse by publisher, era, grade and condition. Variants, signed and slabbed filters are included.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 md:grid-cols-5 mb-8" aria-label="Filters">
        <div>
          <label className="block text-sm" htmlFor="cb-search">
            Search
          </label>
          <input
            id="cb-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Series, issue #, key..."
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm" htmlFor="cb-publisher">
            Publisher
          </label>
          <select
            id="cb-publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">All</option>
            {publishers.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm" htmlFor="cb-era">
            Era
          </label>
          <select
            id="cb-era"
            value={era}
            onChange={(e) => setEra(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">Any</option>
            {eras.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm" htmlFor="cb-grade">
            Grade
          </label>
          <select
            id="cb-grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">Any</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm" htmlFor="cb-condition">
            Condition
          </label>
          <select
            id="cb-condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
          >
            <option value="">Any</option>
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c || 'unspecified'}
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