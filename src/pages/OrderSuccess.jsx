import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Displays a confirmation page after a successful order. The order
// details are retrieved from localStorage based on the orderId. If
// the order cannot be found a fallback message is shown.
export default function OrderSuccess() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('st_last_order');
      if (raw) {
        const o = JSON.parse(raw);
        if (o?.id === orderId) {
          setOrder(o);
        }
      }
    } catch (err) {
      console.error('Failed to load last order', err);
    }
  }, [orderId]);

  const fmt = (v) => v.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

  if (!order) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-2xl font-semibold mb-4">Order not found</h1>
        <p className="mb-4">We were unable to locate your order. It may have expired.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-2">Thank you for your order!</h1>
      <p className="text-gray-600 mb-6">
        Your order <strong>#{order.id}</strong> has been placed successfully. A confirmation email will be sent to you shortly.
      </p>
      <div className="border rounded-lg p-6 space-y-4 mb-6">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
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
          <span>Subtotal</span>
          <span>{fmt(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{fmt(order.shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Discount</span>
          <span>-{fmt(order.discount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>{fmt(order.tax)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{fmt(order.total)}</span>
        </div>
      </div>
      <Link to="/" className="px-4 py-2 bg-yellow-400 rounded-md font-medium hover:bg-yellow-300">
        Continue shopping
      </Link>
    </div>
  );
}