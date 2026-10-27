import { useState, useEffect } from "react";
import {
  CalendarMonth,
  AccessTime,
  LocationOn,
  Phone,
  ContentCopy,
  ReceiptLong,
} from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { bookingApi } from "../../api/apiClient";
import { INITIAL_BOOKINGS } from "../../api/mockData";
import { useAuth } from "../../context/AuthContext";
import { useBooking } from "../../context/BookingContext";
import { useAppTheme } from "../../context/ThemeContext";

const STATUS_COLORS = {
  CONFIRMED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  COMPLETED: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  CANCELLED: "bg-rose-500/10 text-rose-500 border-rose-500/30",
};

const MyBookings = () => {
  const { isDark } = useAppTheme();
  const { token, isAuthenticated } = useAuth();
  const { setCurrentView, navigateToSalon, setIsAuthModalOpen } = useBooking();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState("ALL"); // ALL | UPCOMING | COMPLETED | CANCELLED
  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadBookings() {
      setLoading(true);
      try {
        const data = await bookingApi.getCustomerBookings(token);
        if (isMounted) {
          setBookings(Array.isArray(data) && data.length > 0 ? data : INITIAL_BOOKINGS);
        }
      } catch {
        if (isMounted) setBookings(INITIAL_BOOKINGS);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadBookings();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleCancelBooking = async () => {
    if (!cancelModalBooking) return;
    await bookingApi.cancelBooking(cancelModalBooking.id);
    setBookings((prev) =>
      prev.map((b) => (b.id === cancelModalBooking.id ? { ...b, status: "CANCELLED" } : b))
    );
    setCancelModalBooking(null);
  };

  const copyBookingCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === "ALL") return true;
    if (filterTab === "UPCOMING") return b.status === "CONFIRMED" || b.status === "PENDING";
    if (filterTab === "COMPLETED") return b.status === "COMPLETED";
    if (filterTab === "CANCELLED") return b.status === "CANCELLED";
    return true;
  });

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-lg text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center mx-auto">
          <CalendarMonth sx={{ fontSize: 32 }} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Sign In to View Appointments
        </h2>
        <p className="text-xs text-gray-400">
          Access your appointment history, view salon instructions, or cancel any upcoming reservations.
        </p>
        <Button
          variant="contained"
          fullWidth
          onClick={() => setIsAuthModalOpen(true)}
          sx={{ py: 1.2, fontWeight: 700 }}
        >
          Sign In / Demo Login
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-extrabold text-pink-500">
            Account Appointments
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            My Appointments
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {["ALL", "UPCOMING", "COMPLETED", "CANCELLED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterTab === tab
                  ? "bg-pink-500 text-white shadow-sm shadow-pink-500/30"
                  : "bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="py-24 text-center">
          <CircularProgress size={36} sx={{ color: "#ec4899" }} />
          <p className="text-xs text-gray-400 mt-2">Loading your appointments...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
          <ReceiptLong sx={{ fontSize: 48, color: "#ec4899" }} />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            No {filterTab.toLowerCase()} appointments found
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Ready for a refresh? Browse through our verified luxury salons and book a personalized ritual.
          </p>
          <Button
            variant="contained"
            onClick={() => setCurrentView("salons")}
            sx={{ px: 4, py: 1 }}
          >
            Explore Salons
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => {
            const statusClass = STATUS_COLORS[b.status] || STATUS_COLORS.CONFIRMED;

            return (
              <div
                key={b.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-sm space-y-4 transition-all hover:border-pink-500/20"
              >
                {/* Top Info Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/5 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={b.salonImage || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80"}
                      alt={b.salonName}
                      className="w-12 h-12 rounded-xl object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                        {b.salonName}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <LocationOn sx={{ fontSize: 13, color: "#ec4899" }} />
                        {b.salonAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:justify-end">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase border ${statusClass}`}
                    >
                      {b.status}
                    </span>

                    <button
                      onClick={() => copyBookingCode(b.bookingCode, b.id)}
                      className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-pink-500 text-xs flex items-center gap-1 cursor-pointer font-mono"
                      title="Copy Booking ID"
                    >
                      <ContentCopy sx={{ fontSize: 13 }} />
                      <span>{copiedId === b.id ? "Copied" : b.bookingCode}</span>
                    </button>
                  </div>
                </div>

                {/* Middle Info Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 space-y-1">
                    <span className="text-gray-400 block font-medium">Schedule</span>
                    <p className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1">
                      <AccessTime sx={{ fontSize: 14, color: "#ec4899" }} />
                      {b.startTime}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 space-y-1">
                    <span className="text-gray-400 block font-medium">Payment Mode</span>
                    <p className="font-bold text-gray-800 dark:text-gray-200 uppercase">
                      {b.paymentMethod || "RAZORPAY"} • {b.paymentStatus || "PAID"}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 space-y-1">
                    <span className="text-gray-400 block font-medium">Total Bill</span>
                    <p className="font-extrabold text-base text-pink-500">
                      ₹{b.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Treatments List */}
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1.5">
                    Reserved Treatments:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {b.serviceNames?.map((name, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-500"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Phone sx={{ fontSize: 14 }} />
                    <span>Salon Contact: {b.salonPhone || "+91 98201 23456"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {b.status === "CONFIRMED" && (
                      <button
                        onClick={() => setCancelModalBooking(b)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer border border-rose-500/20"
                      >
                        Cancel Booking
                      </button>
                    )}
                    <button
                      onClick={() => {
                        navigateToSalon({ id: b.salonId, name: b.salonName, city: "Kamtha" });
                      }}
                      className="px-4 py-1.5 rounded-full text-xs font-bold bg-pink-500 text-white shadow-sm shadow-pink-500/20 hover:shadow-md transition-all cursor-pointer"
                    >
                      View Salon
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={Boolean(cancelModalBooking)}
        onClose={() => setCancelModalBooking(null)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            bgcolor: isDark ? "#0f172a" : "#ffffff",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Cancel Appointment?</DialogTitle>
        <DialogContent>
          <p className="text-xs text-gray-500">
            Are you sure you want to cancel your appointment at{" "}
            <strong>{cancelModalBooking?.salonName}</strong> for {cancelModalBooking?.startTime}?
          </p>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setCancelModalBooking(null)}>Keep Appointment</Button>
          <Button
            onClick={handleCancelBooking}
            variant="contained"
            color="error"
            sx={{ fontWeight: 700 }}
          >
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyBookings;
