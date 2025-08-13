import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Registration page. Provides form controls for capturing a
// prospective user's name, email and password with simple client
// validation. On successful submission a success message is shown.
export default function CreateAccount() {
  const [form, setForm] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    confirm: '',
    agree: false,
  });
  const [showPw, setShowPw] = useState({ pw: false, cf: false });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const update = (field) => (e) => {
    const value = field === 'agree' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const toggle = (field) => () => setShowPw((s) => ({ ...s, [field]: !s[field] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { first, last, email, password, confirm, agree } = form;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!first.trim() || !last.trim()) {
      setError('Please enter your first and last name.');
      return;
    }
    if (!email.trim() || !isEmail.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('Please agree to the Terms and Privacy Policy.');
      return;
    }
    // Demo only: in real app call your API here
    setSuccess('Account created (demo). Hook up to your backend next.');
    setForm({ first: '', last: '', email: '', password: '', confirm: '', agree: false });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Create your account</h1>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm" htmlFor="first">
              First name
            </label>
            <input
              id="first"
              value={form.first}
              onChange={update('first')}
              className="mt-1 w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm" htmlFor="last">
              Last name
            </label>
            <input
              id="last"
              value={form.last}
              onChange={update('last')}
              className="mt-1 w-full border rounded-md px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={update('email')}
            className="mt-1 w-full border rounded-md px-3 py-2"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm" htmlFor="password">
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPw.pw ? 'text' : 'password'}
              value={form.password}
              onChange={update('password')}
              className="w-full border rounded-md px-3 py-2 pr-20"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              required
            />
            <button
              type="button"
              onClick={toggle('pw')}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
              aria-label={showPw.pw ? 'Hide password' : 'Show password'}
            >
              {showPw.pw ? 'Hide' : 'Show'}
            </button>
          </div>
          <small className="text-xs text-gray-500">
            Use 8+ characters with a mix of letters and numbers.
          </small>
        </div>
        <div>
          <label className="block text-sm" htmlFor="confirm">
            Confirm password
          </label>
          <div className="relative mt-1">
            <input
              id="confirm"
              type={showPw.cf ? 'text' : 'password'}
              value={form.confirm}
              onChange={update('confirm')}
              className="w-full border rounded-md px-3 py-2 pr-20"
              autoComplete="new-password"
              placeholder="Re‑enter password"
              required
            />
            <button
              type="button"
              onClick={toggle('cf')}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
              aria-label={showPw.cf ? 'Hide password' : 'Show password'}
            >
              {showPw.cf ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="agree"
            type="checkbox"
            checked={form.agree}
            onChange={update('agree')}
            required
          />
          <label htmlFor="agree" className="text-sm">
            I agree to the{' '}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {error && (
          <div className="text-red-600 text-sm" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-sm" role="status">
            {success}
          </div>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-md bg-yellow-400 font-medium hover:bg-yellow-300"
        >
          Create account
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-gray-800 underline">
            Log in
          </Link>
          .
        </p>
      </form>
    </div>
  );
}