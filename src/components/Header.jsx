import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../store/useCart.js';

// Helper to style NavLinks based on whether they are active. When
// active we add a primary colour and bold weight; otherwise we
// provide a subtle hover effect. This function returns a string of
// Tailwind classes.
const navClass = ({ isActive }) =>
  isActive
    ? 'text-blue-600 font-semibold'
    : 'hover:text-blue-600';

export default function Header() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* Logo and site title */}
        <Link to="/" className="flex items-center gap-2">
          {/* Use the provided logo if available; fallback to text only */}
          <img src="/img/supertrade_icon.png" alt="SuperTrade logo" className="w-8 h-8" />
          <span className="font-bold text-xl">SuperTrade</span>
        </Link>
        {/* Primary navigation */}
        <nav className="hidden sm:flex items-center gap-4 text-sm" aria-label="Primary">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/trading-cards" className={navClass}>Trading Cards</NavLink>
          <NavLink to="/comic-books" className={navClass}>Comic Books</NavLink>
          <NavLink to="/video-games" className={navClass}>Video Games</NavLink>
          <NavLink to="/search" className={navClass}>Search</NavLink>
        </nav>
        {/* Authentication and cart links */}
        <div className="flex items-center gap-4 text-sm">
          <NavLink to="/login" className="hover:underline">
            Log&nbsp;in
          </NavLink>
          <NavLink
            to="/cart"
            className="relative border px-3 py-1 rounded-md hover:bg-gray-100"
          >
            Cart{itemCount > 0 && <span className="ml-1">({itemCount})</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
}