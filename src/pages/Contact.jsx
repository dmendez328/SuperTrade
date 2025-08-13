import React, { useState } from 'react';

// A contact form that allows visitors to send a message. The
// submission is simulated client‑side; in a real application this
// would post the message to a server or email service.
export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could send the message via an API. For now we
    // display a confirmation message.
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-md px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full border rounded-md px-3 py-2"
              rows="4"
              placeholder="How can we help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      ) : (
        <p className="text-green-600">Thank you for reaching out! We’ll get back to you soon.</p>
      )}
    </section>
  );
}