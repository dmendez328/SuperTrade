import React from 'react';
import { Link } from 'react-router-dom';

// A simple dashboard landing page for authenticated users. In a real
// application this would be restricted to logged in users and pull
// account data from the server. Here we provide navigation links to
// other account‑related pages.
export default function AccountDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Account Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to your SuperTrade account. From here you can manage your orders,
        profile, wishlist and more.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/orders"
          className="p-6 border rounded-lg hover:shadow flex flex-col gap-2"
        >
          <h2 className="font-medium text-lg">Orders</h2>
          <p className="text-sm text-gray-600">View your past purchases.</p>
        </Link>
        <Link
          to="/profile"
          className="p-6 border rounded-lg hover:shadow flex flex-col gap-2"
        >
          <h2 className="font-medium text-lg">Profile</h2>
          <p className="text-sm text-gray-600">Update your personal details.</p>
        </Link>
        <Link
          to="/wishlist"
          className="p-6 border rounded-lg hover:shadow flex flex-col gap-2"
        >
          <h2 className="font-medium text-lg">Wishlist</h2>
          <p className="text-sm text-gray-600">Keep track of items you love.</p>
        </Link>
        <Link
          to="/sell"
          className="p-6 border rounded-lg hover:shadow flex flex-col gap-2"
        >
          <h2 className="font-medium text-lg">Sell an Item</h2>
          <p className="text-sm text-gray-600">List your own items for sale.</p>
        </Link>
        <Link
          to="/my-listings"
          className="p-6 border rounded-lg hover:shadow flex flex-col gap-2"
        >
          <h2 className="font-medium text-lg">My Listings</h2>
          <p className="text-sm text-gray-600">Manage the items you have for sale.</p>
        </Link>
        <Link
          to="/messages"
          className="p-6 border rounded-lg hover:shadow flex flex-col gap-2"
        >
          <h2 className="font-medium text-lg">Messages</h2>
          <p className="text-sm text-gray-600">Check your inbox and chat with buyers.</p>
        </Link>
        <Link
          to="/payouts"
          className="p-6 border rounded-lg hover:shadow flex flex-col gap-2"
        >
          <h2 className="font-medium text-lg">Payouts</h2>
          <p className="text-sm text-gray-600">Set up your payout method.</p>
        </Link>
      </div>
    </div>
  );
}