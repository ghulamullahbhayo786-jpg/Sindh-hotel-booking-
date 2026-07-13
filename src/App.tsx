import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HotelDetails from './pages/HotelDetails';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Fallback routes */}
          <Route path="/hotels/sukkur" element={<Home />} />
          <Route path="/hotels/khairpur" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
