import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tradingCards from '../data/tradingCards.js';
import comicBooks from '../data/comicBooks.js';
import videoGames from '../data/videoGames.js';
import { useCart } from '../store/useCart.js';

// Compose a master product list by concatenating all category arrays.
const allProducts = [...tradingCards, ...comicBooks, ...videoGames];

// Map id prefixes to hero images. These images live in the public
// folder and correspond to each product category. If a prefix is
// unrecognised the generic cards_and_comics graphic is used.
const heroMap = {
  tc: '/img/tradingcards.png',
  cb: '/img/comicbooks.png',
  vg: '/img/videogames.png',
};

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const product = allProducts.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-2xl font-semibold mb-2">Product not found</h1>
        <p className="text-gray-600">The requested item does not exist.</p>
      </div>
    );
  }

  // Determine hero image based on id prefix.
  const prefix = id.split('-')[0];
  const heroImg = heroMap[prefix] || '/img/cards_and_comics.png';

  // Build details list of key/value pairs depending on which fields
  // exist on the product. This allows the component to adapt to
  // different categories without hard‑coding labels for each.
  const details = [];
  if (product.game) details.push(['Game', product.game]);
  if (product.rarity) details.push(['Rarity', product.rarity]);
  if (product.publisher) details.push(['Publisher', product.publisher]);
  if (product.era) details.push(['Era', product.era]);
  if (product.grade) details.push(['Grade', product.grade]);
  if (product.platform) details.push(['Platform', product.platform]);
  if (product.genre) details.push(['Genre', product.genre]);
  if (product.region) details.push(['Region', product.region]);
  if (product.format) details.push(['Format', product.format]);
  if (product.condition) details.push(['Condition', product.condition]);

  // Meta badges shown near the top of the buy box. We pick the first
  // three meta values for compact display.
  const meta = [
    product.game || product.publisher || product.platform || null,
    product.rarity || product.era || product.genre || null,
    product.condition || null,
  ].filter(Boolean);

  const incrementQty = (step) => {
    setQty((q) => Math.max(1, q + step));
  };

  const handleAdd = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      qty: qty,
      meta: {
        game: product.game || product.publisher || product.platform,
        rarity: product.rarity || product.era || product.genre,
        condition: product.condition,
      },
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Breadcrumb and hero */}
      <div className="mb-6">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-2">
          <button onClick={() => navigate(-1)} className="hover:underline" type="button">
            Back
          </button>{' '}
          / <span aria-current="page">{product.title}</span>
        </nav>
        <h1 className="text-3xl font-semibold mb-1">{product.title}</h1>
        {/* Show a simple subheading with some meta */}
        {meta.length > 0 && (
          <p className="text-gray-600">
            {meta.join(' • ')}
          </p>
        )}
      </div>
      {/* Layout: image and buy box */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
          <img src={heroImg} alt="" className="w-full h-64 object-cover" />
        </div>
        {/* Buy box */}
        <div className="border rounded-lg p-6 shadow-sm flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
            <div className="flex flex-wrap gap-1 text-xs mb-2">
              {meta.map((m, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded-full capitalize">
                  {m}
                </span>
              ))}
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold">
                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="qty" className="sr-only">
              Quantity
            </label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => incrementQty(-1)}
                className="px-3 py-2 hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                id="qty"
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="w-12 text-center border-l border-r"
              />
              <button
                type="button"
                onClick={() => incrementQty(1)}
                className="px-3 py-2 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 w-full px-4 py-2 bg-yellow-400 rounded-md font-medium hover:bg-yellow-300"
            type="button"
          >
            Add to Cart
          </button>
          <button
            className="w-full px-4 py-2 border rounded-md hover:bg-gray-100"
            type="button"
          >
            Add to Wishlist
          </button>
          {/* Details list */}
          {details.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Details</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {details.map(([label, value]) => (
                  <li key={label}>
                    <strong>{label}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}