import React from 'react';
import { Link } from 'react-router-dom';

// The MyListings page shows items a seller has listed on
// SuperTrade. Since we do not persist listings in this demo, the
// page displays a single example listing with simple actions.
export default function MyListings() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Listings</h1>
      <div className="border rounded-lg p-4 shadow-sm space-y-2">
          <strong className="block">Charizard (Base Set)</strong>
          <span className="text-gray-600 text-sm">$250 · Status: Active</span>
          <div className="flex gap-2 mt-4">
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100">Edit</button>
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100">Pause</button>
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100">Delete</button>
          </div>
      </div>
      <div className="mt-6 text-sm text-gray-600">
        Want to list another item? <Link to="/sell" className="text-blue-600 hover:underline">Create a new listing</Link>.
      </div>
    </section>
  );
}