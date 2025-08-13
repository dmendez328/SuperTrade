import React from 'react';
import { Link } from 'react-router-dom';

// The landing page introduces the marketplace and highlights key
// categories. A simple hero section communicates the purpose of
// SuperTrade and invites users to start browsing or selling.
export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">SuperTrade</h1>
            <p className="text-gray-600 text-lg">
              Buy, sell and track <strong>trading cards</strong>,{' '}
              <strong>comic books</strong> and <strong>video games</strong> with a
              collector‑first experience.
            </p>
            <div className="flex gap-3">
              <Link
                to="/trading-cards"
                className="px-4 py-2 rounded-md bg-yellow-400 font-medium hover:bg-yellow-300"
              >
                Browse Trading Cards
              </Link>
              <Link
                to="/sell"
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Sell an Item
              </Link>
            </div>
          </div>
          <div className="h-64 rounded-xl bg-white shadow flex items-center justify-center overflow-hidden">
            <img
              src="/img/cards_and_comics.png"
              alt="Trading cards and comics"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Categories</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <Link
            to="/trading-cards"
            className="p-6 rounded-2xl border hover:shadow transition flex flex-col gap-1"
          >
            <span className="text-lg font-medium">Trading Cards</span>
            <span className="text-sm text-gray-500">Pokémon, MTG, Yu‑Gi‑Oh!</span>
          </Link>
          <Link
            to="/comic-books"
            className="p-6 rounded-2xl border hover:shadow transition flex flex-col gap-1"
          >
            <span className="text-lg font-medium">Comic Books</span>
            <span className="text-sm text-gray-500">Vintage &amp; Modern</span>
          </Link>
          <Link
            to="/video-games"
            className="p-6 rounded-2xl border hover:shadow transition flex flex-col gap-1"
          >
            <span className="text-lg font-medium">Video Games</span>
            <span className="text-sm text-gray-500">Retro to Next‑Gen</span>
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white border-t">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Us</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-start gap-2">
              <span className="text-3xl" role="img" aria-label="Shield">
                🛡️
              </span>
              <h3 className="font-medium text-lg">Secure Transactions</h3>
              <p className="text-gray-600 text-sm">
                Safe checkout and order protection on every purchase.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-3xl" role="img" aria-label="Checkmark">
                ✅
              </span>
              <h3 className="font-medium text-lg">Verified Sellers</h3>
              <p className="text-gray-600 text-sm">
                Transparent ratings, condition notes and clear photos.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-3xl" role="img" aria-label="Community">
                👥
              </span>
              <h3 className="font-medium text-lg">Active Community</h3>
              <p className="text-gray-600 text-sm">
                Collectors helping collectors find their next favourite item.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}