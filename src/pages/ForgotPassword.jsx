import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// A basic password reset page. The user enters their email and
// clicks a button to simulate sending a reset link. When the
// process completes we navigate back to the login screen.
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    // Simulate sending a reset email. In a real app you would
    // trigger an API request here. We display a confirmation and
    // redirect to login after a short delay.
    setSent(true);
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Forgot Password</h1>
      {!sent ? (
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Send reset link
          </button>
        </form>
      ) : (
        <p className="text-green-600">A password reset link has been sent to {email}.</p>
      )}
    </section>
  );
}