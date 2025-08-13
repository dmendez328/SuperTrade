import React from 'react';

// A simple messages page that displays an empty inbox. In a full
// application this page would fetch and render a list of buyer
// and seller conversations.
export default function Messages() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Inbox</h1>
      <div className="border rounded-lg p-6 shadow-sm text-gray-600">
        No messages yet.
      </div>
    </section>
  );
}