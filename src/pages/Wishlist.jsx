import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder for the wishlist feature. Items added to the
// wishlist are not persisted in this demo. The page encourages
// exploring items and using the add to cart functionality instead.
export default function Wishlist() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
      <p className="text-gray-600 mb-6">
        This feature is coming soon. In the meantime, add items to your cart and
        complete your purchase or bookmark them for later.
      </p>
      <Link
        to="/trading-cards"
        className="px-4 py-2 bg-yellow-400 rounded-md font-medium hover:bg-yellow-300"
      >
        Browse items
      </Link>
    </div>
  );
}