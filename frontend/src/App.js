import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SalonDetails from './pages/SalonDetails';
import CustomerBookings from './pages/CustomerBookings';
import SalonDashboard from './pages/SalonDashboard';
import AuthModal from './pages/AuthModal';

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/salon/:id" element={<SalonDetails />} />
          <Route path="/bookings" element={<CustomerBookings />} />
          <Route path="/partner/dashboard" element={<SalonDashboard />} />
        </Routes>
      </main>
      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
