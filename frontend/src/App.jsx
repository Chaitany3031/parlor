import React from "react";
import { ThemeContextProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider, useBooking } from "./context/BookingContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import BookingModal from "./components/BookingModal";
import CartDrawer from "./components/CartDrawer";
import Home from "./Customer/Home/Home";
import SalonList from "./Customer/Salon/SalonList";
import SalonDetails from "./Customer/Salon/SalonDetails/SalonDetails";
import MyBookings from "./Customer/Booking/MyBookings";
import OwnerPortal from "./Customer/Owner/OwnerPortal";

const MainContent = () => {
  const { currentView } = useBooking();

  return (
    <main className="flex-1 w-full">
      {currentView === "home" && <Home />}
      {currentView === "salons" && (
        <div className="py-6">
          <SalonList />
        </div>
      )}
      {currentView === "salon-detail" && <SalonDetails />}
      {currentView === "my-bookings" && <MyBookings />}
      {currentView === "owner-portal" && <OwnerPortal />}
    </main>
  );
};

const App = () => {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <BookingProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <Navbar />
            <MainContent />
            <Footer />
            
            {/* Global Overlays & Modals */}
            <CartDrawer />
            <BookingModal />
            <AuthModal />
          </div>
        </BookingProvider>
      </AuthProvider>
    </ThemeContextProvider>
  );
};

export default App;
