import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/useCart.js';

// Maps id prefixes to representative images. If the id does not
// match one of the expected prefixes, a generic hero image is used.
const imageMap = {
  tc: '/img/tradingcards.png',
  cb: '/img/comicbooks.png',
  vg: '/img/videogames.png',
};

export default function ProductCard({ item }) {
  const { addItem } = useCart();

  // Derive an image based on the id prefix. The id format
  // convention is something like "tc-0" or "cb-1".
  const prefix = (item.id || '').split('-')[0];
  const imgSrc = imageMap[prefix] || '/img/cards_and_comics.png';

  // Build a human friendly list of meta values. We pick a few
  // interesting fields depending on which ones exist. Falsy values
  // (empty strings) are filtered out.
  const metaFields = [
    item.game || item.publisher || item.platform || null,
    item.rarity || item.era || item.genre || null,
    item.condition || null,
  ].filter(Boolean);

  const handleAdd = () => {
    // When adding to cart we always start with a quantity of 1.
    addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      qty: 1,
      meta: {
        game: item.game || item.publisher || item.platform,
        rarity: item.rarity || item.era || item.genre,
        condition: item.condition,
      },
    });
  };

  return (
    <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <Link to={`/product/${item.id}`} aria-label={`View ${item.title}`} className="block">
        <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img src={imgSrc} alt="" className="object-cover w-full h-full" />
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-2">
        {/* Badges */}
        <div className="flex flex-wrap gap-1 text-xs">
          {metaFields.map((m, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-600 capitalize"
            >
              {m}
            </span>
          ))}
        </div>
        {/* Title */}
        <h3 className="font-medium text-sm line-clamp-2 min-h-[2rem]">{item.title}</h3>
        {/* Price and actions */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-gray-800">
            ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <button
            onClick={handleAdd}
            className="text-sm px-3 py-1 border rounded-md hover:bg-gray-100"
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}