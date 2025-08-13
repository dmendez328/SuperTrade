import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../store/useCart.js';

// Constants for checkout calculations. Tax rate and shipping costs
// mirror those used elsewhere in the demo. Promo codes apply to
// subtotal only.
const TAX_RATE = 0.095;
const SHIP_STANDARD = 4.99;
const SHIP_EXPEDITED = 14.99;
const FREE_SHIP_THRESHOLD = 100;

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [address, setAddress] = useState({
    first: '',
    last: '',
    addr1: '',
    addr2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  const [shipMethod, setShipMethod] = useState('standard');
  const [promo, setPromo] = useState('');
  const [error, setError] = useState('');

  // If cart is empty, redirect back to cart page.
  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <p>Your cart is empty. Please add items before checking out.</p>
        <Link to="/cart" className="text-blue-600 hover:underline">
          Back to cart
        </Link>
      </div>
    );
  }

  // Derived order values. Shipping is free above the threshold, but
  // choosing expedited always applies the expedited rate.
  const shipCost =
    subtotal >= FREE_SHIP_THRESHOLD
      ? 0
      : shipMethod === 'expedited'
      ? SHIP_EXPEDITED
      : SHIP_STANDARD;
  const discount = promo.trim().toUpperCase() === 'SAVE10' ? subtotal * 0.1 : 0;
  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * TAX_RATE;
  const total = taxable + shipCost + tax;

  const fmt = (v) => v.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Basic email validation
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contact.email || !isEmail.test(contact.email)) {
      setError('Please enter a valid email.');
      return;
    }
    // Very light required field checks
    if (!address.first || !address.last || !address.addr1 || !address.city || !address.state || !address.zip) {
      setError('Please complete the shipping address.');
      return;
    }
    // Build an order object and persist it for the order success page
    const orderId = Date.now().toString();
    const order = {
      id: orderId,
      items: cart,
      subtotal,
      shipping: shipCost,
      discount,
      tax,
      total,
    };
    try {
      localStorage.setItem('st_last_order', JSON.stringify(order));
    } catch (err) {
      console.error('Failed to save order', err);
    }
    clearCart();
    navigate(`/order-success/${orderId}`);
  };

  // Handlers for updating nested form state fields
  const updateContact = (field) => (e) => setContact((c) => ({ ...c, [field]: e.target.value }));
  const updateAddress = (field) => (e) => setAddress((a) => ({ ...a, [field]: e.target.value }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <p className="text-gray-600 mb-6">Secure checkout — contact, shipping and payment (demo).</p>
      <div className="grid md:grid-cols-3 gap-10">
        {/* Forms column */}
        <section className="md:col-span-2 space-y-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Contact</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm" htmlFor="co-email">
                    Email
                  </label>
                  <input
                    id="co-email"
                    type="email"
                    value={contact.email}
                    onChange={updateContact('email')}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="block text-sm" htmlFor="co-phone">
                    Phone
                  </label>
                  <input
                    id="co-phone"
                    type="tel"
                    value={contact.phone}
                    onChange={updateContact('phone')}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>
            {/* Shipping address */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Shipping address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm" htmlFor="co-first">
                    First name
                  </label>
                  <input
                    id="co-first"
                    value={address.first}
                    onChange={updateAddress('first')}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm" htmlFor="co-last">
                    Last name
                  </label>
                  <input
                    id="co-last"
                    value={address.last}
                    onChange={updateAddress('last')}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm" htmlFor="co-addr1">
                  Address
                </label>
                <input
                  id="co-addr1"
                  value={address.addr1}
                  onChange={updateAddress('addr1')}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm" htmlFor="co-addr2">
                  Apt, suite, etc. (optional)
                </label>
                <input
                  id="co-addr2"
                  value={address.addr2}
                  onChange={updateAddress('addr2')}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm" htmlFor="co-city">
                    City
                  </label>
                  <input
                    id="co-city"
                    value={address.city}
                    onChange={updateAddress('city')}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm" htmlFor="co-state">
                    State
                  </label>
                    <input
                      id="co-state"
                      value={address.state}
                      onChange={updateAddress('state')}
                      className="mt-1 w-full border rounded-md px-3 py-2"
                      required
                    />
                </div>
                <div>
                  <label className="block text-sm" htmlFor="co-zip">
                    ZIP
                  </label>
                  <input
                    id="co-zip"
                    value={address.zip}
                    onChange={updateAddress('zip')}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm" htmlFor="co-country">
                  Country
                </label>
                <input
                  id="co-country"
                  value={address.country}
                  onChange={updateAddress('country')}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
            </div>
            {/* Shipping method */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Shipping method</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="ship"
                    value="standard"
                    checked={shipMethod === 'standard'}
                    onChange={() => setShipMethod('standard')}
                  />
                  Standard (3–6 business days) — {fmt(SHIP_STANDARD)} (free $100+)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="ship"
                    value="expedited"
                    checked={shipMethod === 'expedited'}
                    onChange={() => setShipMethod('expedited')}
                  />
                  Expedited (2–3 business days) — {fmt(SHIP_EXPEDITED)}
                </label>
              </div>
            </div>
            {/* Payment stub */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Payment</h2>
              <p className="text-sm text-gray-600 mb-4">
                Payment processing is stubbed out for this demo. Choose a promo code below.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm" htmlFor="co-promo">
                    Promo code
                  </label>
                  <input
                    id="co-promo"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    placeholder="SAVE10"
                  />
                </div>
              </div>
            </div>
            {error && <div className="text-red-600 text-sm" role="alert">{error}</div>}
            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                to="/cart"
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Back to cart
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 rounded-md font-medium hover:bg-yellow-300"
                style={{ minWidth: '200px' }}
              >
                Place order
              </button>
            </div>
          </form>
        </section>
        {/* Summary */}
        <aside className="border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <img
                  src={(() => {
                    const prefix = item.id.split('-')[0];
                    if (prefix === 'tc') return '/img/tradingcards.png';
                    if (prefix === 'cb') return '/img/comicbooks.png';
                    if (prefix === 'vg') return '/img/videogames.png';
                    return '/img/cards_and_comics.png';
                  })()}
                  alt=""
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="truncate">{item.title}</div>
                  <div className="text-xs text-gray-600 truncate">
                    {[item?.meta?.game, item?.meta?.rarity, item?.meta?.condition]
                      .filter(Boolean)
                      .join(' • ')}
                  </div>
                </div>
                <div className="text-sm">×{item.qty}</div>
                <div className="text-sm">{fmt(item.price * item.qty)}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{fmt(shipCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{fmt(tax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Discount</span>
            <span>-{fmt(discount)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>
          <p className="text-xs text-gray-500">
            Using demo calculations. Taxes and shipping adjust on order placement.
          </p>
        </aside>
      </div>
    </div>
  );
}