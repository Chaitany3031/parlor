import React, { createContext, useContext, useState, useMemo } from "react";
import { bookingApi } from "../api/apiClient";
import { useAuth } from "./AuthContext";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const { user, token } = useAuth();

  // Navigation State
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'salons' | 'salon-detail' | 'my-bookings' | 'owner-portal'
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Salon & Service Selection
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  // Booking Wizard State
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [selectedSlot, setSelectedSlot] = useState("11:30 AM");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("RAZORPAY");

  // Modals & Drawers
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeBookingSuccess, setActiveBookingSuccess] = useState(null);

  // Cart operations
  const addService = (service) => {
    // If selecting a service from another salon, confirm or update
    if (selectedSalon && Number(selectedSalon.id) !== Number(service.salonId)) {
      // Keep same salon or switch
    }
    setSelectedServices((prev) => {
      if (prev.some((s) => s.id === service.id)) return prev;
      return [...prev, service];
    });
  };

  const removeService = (serviceId) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  const isServiceSelected = (serviceId) => {
    return selectedServices.some((s) => s.id === serviceId);
  };

  const clearSelectedServices = () => {
    setSelectedServices([]);
  };

  // Computations
  const totalPrice = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + (s.price || 0), 0);
  }, [selectedServices]);

  const totalDuration = useMemo(() => {
    const mins = selectedServices.reduce((sum, s) => sum + (s.duration || 30), 0);
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    if (hours === 0) return `${remMins} mins`;
    if (remMins === 0) return `${hours} hr`;
    return `${hours}h ${remMins}m`;
  }, [selectedServices]);

  // Navigate to salon details helper
  const navigateToSalon = (salon) => {
    setSelectedSalon(salon);
    setCurrentView("salon-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit booking
  const confirmBooking = async () => {
    if (!selectedSalon || selectedServices.length === 0) return null;

    const res = await bookingApi.createBooking({
      salonId: selectedSalon.id,
      paymentMethod: selectedPaymentMethod,
      serviceIds: selectedServices.map((s) => s.id),
      date: selectedDate,
      timeSlot: selectedSlot,
      user,
      salon: selectedSalon,
      services: selectedServices,
      token,
    });

    const bookingData = res.booking || {
      id: Date.now(),
      salonName: selectedSalon.name,
      salonAddress: selectedSalon.address,
      serviceNames: selectedServices.map((s) => s.name),
      totalPrice,
      startTime: `${selectedDate} ${selectedSlot}`,
      bookingCode: `ANGEL-${Math.floor(10000 + Math.random() * 90000)}`,
      paymentMethod: selectedPaymentMethod,
      status: "CONFIRMED",
    };

    setActiveBookingSuccess(bookingData);
    clearSelectedServices();
    setIsBookingModalOpen(false);
    return bookingData;
  };

  return (
    <BookingContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCity,
        setSelectedCity,
        searchQuery,
        setSearchQuery,
        selectedSalon,
        setSelectedSalon,
        selectedServices,
        addService,
        removeService,
        isServiceSelected,
        clearSelectedServices,
        totalPrice,
        totalDuration,
        selectedDate,
        setSelectedDate,
        selectedSlot,
        setSelectedSlot,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        isBookingModalOpen,
        setIsBookingModalOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        activeBookingSuccess,
        setActiveBookingSuccess,
        navigateToSalon,
        confirmBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
