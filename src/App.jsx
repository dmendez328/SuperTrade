import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import TradingCards from './pages/TradingCards.jsx';
import ComicBooks from './pages/ComicBooks.jsx';
import VideoGames from './pages/VideoGames.jsx';
import Product from './pages/Product.jsx';
import CartPage from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import AccountDashboard from './pages/AccountDashboard.jsx';
import Orders from './pages/Orders.jsx';
import Profile from './pages/Profile.jsx';
import Wishlist from './pages/Wishlist.jsx';
import SellItem from './pages/SellItem.jsx';
import MyListings from './pages/MyListings.jsx';
import Messages from './pages/Messages.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Help from './pages/Help.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Returns from './pages/Returns.jsx';
import Terms from './pages/Terms.jsx';
import Payouts from './pages/Payouts.jsx';

import { CartProvider } from './store/useCart.js';

// The App component sets up the common page layout (header, footer)
// and defines all client‑side routes for the SuperTrade SPA. It
// wraps children in CartProvider so that the shopping cart state is
// available anywhere in the app. Unmatched routes fall back to the
// home page to provide a friendly default.
export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/trading-cards" element={<TradingCards />} />
            <Route path="/comic-books" element={<ComicBooks />} />
            <Route path="/video-games" element={<VideoGames />} />
          <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
            <Route path="/account" element={<AccountDashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/sell" element={<SellItem />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/payouts" element={<Payouts />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}