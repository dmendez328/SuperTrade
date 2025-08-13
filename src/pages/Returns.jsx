import React from 'react';

// A simple returns policy page. Replace the text here with your
// actual returns policy if you have one.
export default function Returns() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Returns Policy</h1>
      <p className="text-gray-700 mb-4">
        Return items within 30 days in their original condition to
        receive a full refund. Buyers are responsible for return
        shipping. Contact us if you have any questions or need
        assistance with your return.
      </p>
    </section>
  );
}