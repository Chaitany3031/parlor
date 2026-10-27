import React from "react";
import { Drawer, IconButton, Button, Divider } from "@mui/material";
import {
  Close as CloseIcon,
  Delete,
  AccessTime,
  ShoppingBagOutlined,
  CalendarMonth,
} from "@mui/icons-material";
import { useBooking } from "../context/BookingContext";
import { useAppTheme } from "../context/ThemeContext";

const CartDrawer = () => {
  const { isDark } = useAppTheme();
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    selectedSalon,
    selectedServices,
    removeService,
    clearSelectedServices,
    totalPrice,
    totalDuration,
    setIsBookingModalOpen,
    setCurrentView,
  } = useBooking();

  const handleProceed = () => {
    setIsCartDrawerOpen(false);
    setIsBookingModalOpen(true);
  };

  return (
    <Drawer
      anchor="right"
      open={isCartDrawerOpen}
      onClose={() => setIsCartDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          bgcolor: isDark ? "#090d16" : "#ffffff",
          color: isDark ? "#f8fafc" : "#0f172a",
          boxShadow: isDark
            ? "-10px 0 30px rgba(0,0,0,0.7)"
            : "-10px 0 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <div className="flex flex-col h-full">
        {/* Drawer Header */}
        <div className="p-5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center">
              <ShoppingBagOutlined sx={{ fontSize: 18 }} />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white leading-none">
                Selected Services
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {selectedSalon?.name || "Angels Parlor"}
              </p>
            </div>
          </div>
          <IconButton onClick={() => setIsCartDrawerOpen(false)} size="small">
            <CloseIcon sx={{ color: isDark ? "#94a3b8" : "#64748b" }} />
          </IconButton>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {selectedServices.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center">
                <ShoppingBagOutlined sx={{ fontSize: 32 }} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                  Your cart is empty
                </h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Browse through services and add treatments to schedule your beauty day.
                </p>
              </div>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCurrentView("salons");
                }}
                sx={{ px: 3, mt: 2 }}
              >
                Explore Salons
              </Button>
            </div>
          ) : (
            selectedServices.map((service) => (
              <div
                key={service.id}
                className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between gap-3 group transition-all hover:border-pink-500/30"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {service.name}
                    </h5>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-0.5">
                        <AccessTime sx={{ fontSize: 13 }} />
                        {service.duration} mins
                      </span>
                      <span>•</span>
                      <span className="font-bold text-pink-500">₹{service.price}</span>
                    </div>
                  </div>
                </div>

                <IconButton
                  size="small"
                  onClick={() => removeService(service.id)}
                  sx={{ color: "#ef4444", opacity: 0.8, "&:hover": { opacity: 1 } }}
                  title="Remove service"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {selectedServices.length > 0 && (
          <div className="p-5 border-t border-black/5 dark:border-white/10 bg-slate-50 dark:bg-[#070a11] space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Total Treatments:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {selectedServices.length}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Estimated Time:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  ⏳ {totalDuration}
                </span>
              </div>
              <Divider sx={{ my: 1 }} />
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-sm text-gray-900 dark:text-white">
                  Total Amount:
                </span>
                <span className="text-xl font-extrabold text-pink-500">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<CalendarMonth />}
              onClick={handleProceed}
              sx={{ py: 1.4, fontWeight: 700 }}
            >
              Choose Date & Time Slot
            </Button>

            <button
              onClick={clearSelectedServices}
              className="w-full text-center text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Clear all selected services
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
