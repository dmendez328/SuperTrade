import React from 'react';

// A payouts settings page. In a production system users would
// connect a payout method like PayPal or a bank account. Here we
// simply display a placeholder with a button to add one.
export default function Payouts() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Payouts</h1>
      <div className="border rounded-lg p-6 shadow-sm space-y-4">
        <p className="text-gray-700">No payout method set.</p>
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700" type="button">
          Add payout method
        </button>
      </div>
    </section>
  );
}