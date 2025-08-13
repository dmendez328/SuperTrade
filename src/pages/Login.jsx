import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Login form component. Performs basic client‑side validation and
// toggles password visibility. In a real application this would
// authenticate via an API and redirect the user on success. Here we
// simply display an alert as a placeholder.
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePassword = () => setShowPassword((v) => !v);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Simple email pattern check
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !isEmail.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    // Placeholder: replace with real authentication call
    alert('Logged in (demo). Hook up to your backend next.');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="block text-sm" htmlFor="login-password">
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 pr-20"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-1">
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
        {error && <div className="text-red-600 text-sm" role="alert">{error}</div>}
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-md bg-yellow-400 font-medium hover:bg-yellow-300"
        >
          Sign in
        </button>
      </form>
      <div className="text-sm text-gray-600 mt-4">
        New here?{' '}
        <Link to="/create-account" className="text-gray-800 underline">
          Create an account
        </Link>
        .
      </div>
    </div>
  );
}