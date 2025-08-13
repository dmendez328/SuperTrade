import React from 'react';

// Static help/FAQ page. Provides a placeholder for common
// questions and answers. You can expand this page with real
// content as needed.
export default function Help() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Help &amp; FAQ</h1>
      <p className="text-gray-700 mb-4">
        Welcome to the SuperTrade Help &amp; FAQ section. Here you
        can find answers to common questions about buying, selling
        and managing your account. For now this is just a
        placeholder—feel free to contact us if you have a specific
        question.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">How do I create an account?</h2>
      <p className="text-gray-700 mb-4">
        Click on the “Create account” link in the top navigation
        bar and fill out the registration form. You’ll need a
        valid email address and a password. Once registered you
        can start browsing and listing items.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">How do I list an item for sale?</h2>
      <p className="text-gray-700 mb-4">
        Navigate to the “Sell” link in the footer or top menu. On
        the sell page you can enter details about your item,
        upload photos and set a price. When you’re ready click
        “Publish” to post your listing.
      </p>
    </section>
  );
}