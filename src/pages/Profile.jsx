import React, { useState } from 'react';

// Simple profile form. Since we do not have a backend to persist
// changes, this component only stores values in local component
// state. Fields are prefilled with placeholder values. In a real
// application this would fetch and update data via an API.
export default function Profile() {
  const [profile, setProfile] = useState({
    first: 'Collector',
    last: 'McTrade',
    email: 'you@example.com',
  });
  const [message, setMessage] = useState('');

  const update = (field) => (e) => {
    setProfile((p) => ({ ...p, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Profile updated (demo). No data is persisted.');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm" htmlFor="profile-first">
              First name
            </label>
            <input
              id="profile-first"
              value={profile.first}
              onChange={update('first')}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm" htmlFor="profile-last">
              Last name
            </label>
            <input
              id="profile-last"
              value={profile.last}
              onChange={update('last')}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm" htmlFor="profile-email">
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            value={profile.email}
            onChange={update('email')}
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>
        {message && <div className="text-green-600 text-sm">{message}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 rounded-md font-medium hover:bg-yellow-300"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}