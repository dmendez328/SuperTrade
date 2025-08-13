import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Displays a list of orders. For the purposes of this demo we only
// keep the last order in localStorage. In a real application you
// would fetch this list from a backend API. Each order can be
// clicked to view the items it contains.
export default function Orders() {
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('st_last_order');
      if (raw) setLastOrder(JSON.parse(raw));
    } catch (err) {
      console.error('Failed to load last order', err);
    }
  }, []);

  const fmt = (v) => v.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      {lastOrder ? (
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Order #{lastOrder.id}</h2>
          <div className="space-y-3">
            {lastOrder.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium">{item.title}</div>
                  <div className="text-xs text-gray-600 truncate">
                    {[item?.meta?.game, item?.meta?.rarity, item?.meta?.condition]
                      .filter(Boolean)
                      .join(' • ')}
                  </div>
                </div>
                <div className="w-12 text-center">×{item.qty}</div>
                <div className="w-24 text-right">{fmt(item.price * item.qty)}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm pt-2 border-t">
            <span>Total</span>
            <span>{fmt(lastOrder.total)}</span>
          </div>
          <Link to={`/order-success/${lastOrder.id}`} className="text-blue-600 hover:underline text-sm">
            View details
          </Link>
        </div>
      ) : (
        <p>You haven't placed any orders yet.</p>
      )}
    </div>
  );
}