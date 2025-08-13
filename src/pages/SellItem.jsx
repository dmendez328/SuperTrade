import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The SellItem page provides a simple form allowing users to
// create a new listing. Since this is a demo application, the
// form does not persist data anywhere; instead, submitting the
// form redirects the user to the My Listings page. All fields are
// optional, and you can expand this page to include real
// validation or API calls in the future.
export default function SellItem() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Trading Cards');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Near Mint');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would persist the listing here. For now
    // just navigate to the My Listings page.
    navigate('/my-listings');
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Create Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            placeholder="e.g., Charizard Base Set Holo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full border rounded-md px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Trading Cards</option>
            <option>Comic Books</option>
            <option>Video Games</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            className="w-full border rounded-md px-3 py-2"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Condition</label>
          <select
            className="w-full border rounded-md px-3 py-2"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option>Near Mint</option>
            <option>Lightly Played</option>
            <option>Moderately Played</option>
            <option>Graded</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Images</label>
          <input
            type="file"
            multiple
            className="w-full border rounded-md px-3 py-2"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded-md px-3 py-2"
            rows="4"
            placeholder="Details, set, notes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Publish
          </button>
        </div>
      </form>
    </section>
  );
}