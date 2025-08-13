import React from 'react';

// An about page describing the SuperTrade marketplace. This
// component contains static content only.
export default function About() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">About SuperTrade</h1>
      <p className="text-gray-700 mb-4">
        SuperTrade is a fictional marketplace created to showcase
        modern web development techniques. Our goal is to provide
        collectors and enthusiasts with a clean, simple and
        intuitive interface for buying and selling trading cards,
        comic books and video games. While this demo doesn’t
        actually process transactions, it illustrates how you can
        organise data, manage state and build a responsive user
        interface with React and Tailwind CSS.
      </p>
      <p className="text-gray-700 mb-4">
        The original static HTML version of SuperTrade has been
        carefully ported to a single‑page application. We’ve
        maintained the familiar look and feel while adding
        interactivity such as filtering, search and client‑side
        routing. Explore the code to see how components are
        structured, and feel free to expand upon this foundation.
      </p>
      <p className="text-gray-700">
        We hope you enjoy your stay and that this project serves as
        inspiration for your own web development endeavours!
      </p>
    </section>
  );
}