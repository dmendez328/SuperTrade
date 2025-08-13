import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/useCart.js';

// Constants for demo tax/shipping calculations. In a real
// application these would be derived from the user's address and
// chosen shipping method.
const TAX_RATE = 0.095;
const FREE_SHIP_THRESHOLD = 100;
const SHIP_FLAT = 4.99;

export default function Cart() {
  const { cart, updateQty, removeItem, clearCart, subtotal } = useCart();

  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : SHIP_FLAT;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  // Format currency consistently
  const fmt = (v) => v.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-2">Your Cart</h1>
      <p className="text-gray-600 mb-6">
        Review items, update quantities and proceed to checkout.
      </p>
      {cart.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="mb-4">Your cart is empty.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/trading-cards"
              className="px-4 py-2 rounded-md font-medium bg-yellow-400 hover:bg-yellow-300"
            >
              Shop Trading Cards
            </Link>
            <Link
              to="/comic-books"
              className="px-4 py-2 rounded-md font-medium border hover:bg-gray-100"
            >
              Shop Comics
            </Link>
            <Link
              to="/video-games"
              className="px-4 py-2 rounded-md font-medium border hover:bg-gray-100"
            >
              Shop Games
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {/* Cart items */}
          <section className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <article
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg"
              >
                {/* Image placeholder */}
                <Link
                  to={`/product/${item.id}`}
                  aria-label={`View ${item.title}`}
                  className="w-24 h-24 bg-gray-50 flex-shrink-0 rounded-lg overflow-hidden"
                >
                  {/* Use same image as product card */}
                  <img
                    src={(() => {
                      const prefix = item.id.split('-')[0];
                      if (prefix === 'tc') return '/img/tradingcards.png';
                      if (prefix === 'cb') return '/img/comicbooks.png';
                      if (prefix === 'vg') return '/img/videogames.png';
                      return '/img/cards_and_comics.png';
                    })()}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </Link>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="text-xs text-gray-600">
                    {[item?.meta?.game, item?.meta?.rarity, item?.meta?.condition]
                      .filter(Boolean)
                      .join(' • ')}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
                {/* Price */}
                <div className="w-20 text-right font-medium">
                  {fmt(item.price)}
                </div>
                {/* Quantity controls */}
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                    aria-label="Decrease quantity"
                    type="button"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, e.target.value)}
                    className="w-12 text-center border-l border-r"
                  />
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                    aria-label="Increase quantity"
                    type="button"
                  >
                    +
                  </button>
                </div>
                {/* Line total */}
                <div className="w-24 text-right font-medium">
                  {fmt(item.price * item.qty)}
                </div>
              </article>
            ))}
          </section>
          {/* Summary */}
          <aside className="border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{fmt(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>{fmt(tax)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
            <div className="space-y-2">
              <button
                onClick={clearCart}
                className="w-full px-4 py-2 border rounded-md hover:bg-gray-100"
                type="button"
              >
                Clear cart
              </button>
              <Link
                to={cart.length === 0 ? '#' : '/checkout'}
                className={`w-full block text-center px-4 py-2 rounded-md font-medium ${
                  cart.length === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-300'
                }`}
                aria-disabled={cart.length === 0}
              >
                Checkout
              </Link>
              <p className="text-xs text-gray-500">
                Shipping is <strong>free</strong> on orders over $100. Tax estimate
                uses your locale defaults.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}