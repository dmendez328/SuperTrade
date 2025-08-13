import React from 'react';
import { NavLink } from 'react-router-dom';

// A simple footer that displays the current year and a few helpful
// links. The layout is responsive: items stack on small screens and
// sit in a row on larger screens.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 gap-4">
        <div>© {year} SuperTrade</div>
        <ul className="flex flex-wrap gap-4">
          <li>
            <NavLink to="/about" className="hover:text-gray-800">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/sell" className="hover:text-gray-800">
              Sell
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:text-gray-800">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/terms" className="hover:text-gray-800">
              Terms
            </NavLink>
          </li>
          <li>
            <NavLink to="/privacy" className="hover:text-gray-800">
              Privacy
            </NavLink>
          </li>
          <li>
            <NavLink to="/returns" className="hover:text-gray-800">
              Returns
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}