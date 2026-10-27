import { useState, useEffect } from "react";
import {
  AttachMoney,
  EventAvailable,
  PeopleAltOutlined,
  Star,
  Close,
  DoneAll,
  Store,
  LocationOn,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { bookingApi, salonApi } from "../../api/apiClient";
import { INITIAL_BOOKINGS, INITIAL_SALONS } from "../../api/mockData";

const OwnerPortal = () => {
  const { user, token, isAuthenticated, demoLogin } = useAuth();

  const [salon, setSalon] = useState(INITIAL_SALONS[0]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadOwnerData() {
      setLoading(true);
      try {
        const [salonData, bookingsData] = await Promise.all([
          salonApi.getSalonByOwner(token),
          bookingApi.getCustomerBookings(token),
        ]);
        if (isMounted) {
          if (salonData) setSalon(salonData);
          if (Array.isArray(bookingsData)) setBookings(bookingsData);
        }
      } catch {
        if (isMounted) {
          setSalon(INITIAL_SALONS[0]);
          setBookings(INITIAL_BOOKINGS);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadOwnerData();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    await bookingApi.updateBookingStatus(bookingId, newStatus);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const isOwner = user?.role === "SALON_OWNER";

  if (!isAuthenticated || !isOwner) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-lg text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center mx-auto">
          <Store sx={{ fontSize: 32 }} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Salon Partner Portal
        </h2>
        <p className="text-xs text-gray-400">
          Manage live client appointments, configure menu items, and view salon revenue reports.
        </p>
        <Button
          variant="contained"
          fullWidth
          onClick={() => demoLogin("SALON_OWNER")}
          sx={{
            py: 1.2,
            fontWeight: 700,
            bgcolor: "#8b5cf6 !important",
            "&:hover": { bgcolor: "#7c3aed !important" },
          }}
        >
          Sign In as Demo Salon Partner
        </Button>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = bookings.reduce(
    (sum, b) => (b.status !== "CANCELLED" ? sum + (b.totalPrice || 0) : sum),
    0
  );
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-900/40 via-purple-900/30 to-pink-900/40 border border-violet-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
            Partner Studio Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {salon.name}
          </h1>
          <p className="text-xs text-gray-300 flex items-center gap-2">
            <LocationOn sx={{ fontSize: 14, color: "#a78bfa" }} />
            {salon.address}, {salon.city}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-right">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              Studio Operating Hours
            </span>
            <span className="text-sm font-bold text-white">
              {salon.openTime || "09:00"} - {salon.closeTime || "21:30"}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <AttachMoney sx={{ fontSize: 22 }} />
          </div>
          <span className="text-xs font-semibold text-gray-400">Total Bookings Revenue</span>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center">
            <EventAvailable sx={{ fontSize: 22 }} />
          </div>
          <span className="text-xs font-semibold text-gray-400">Upcoming Appointments</span>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {confirmedCount} Active
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <PeopleAltOutlined sx={{ fontSize: 22 }} />
          </div>
          <span className="text-xs font-semibold text-gray-400">Total Client Visits</span>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {bookings.length}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Star sx={{ fontSize: 22 }} />
          </div>
          <span className="text-xs font-semibold text-gray-400">Overall Rating</span>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {salon.rating || 4.9} ★
          </p>
        </div>
      </div>

      {/* Appointments Management Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Incoming Client Appointments
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Review, confirm, or complete customer bookings in real-time
            </p>
          </div>
          <span className="text-xs text-violet-500 font-bold bg-violet-500/10 px-3 py-1 rounded-full">
            {bookings.length} reservations
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <CircularProgress size={30} sx={{ color: "#8b5cf6" }} />
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">
                    {b.customerName || "Valued Customer"}
                  </span>
                  <span className="font-mono text-xs font-bold text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded">
                    {b.bookingCode}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  📅 {b.startTime} • ₹{b.totalPrice} ({b.paymentMethod})
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {b.serviceNames?.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-2 sm:self-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                    b.status === "CONFIRMED"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : b.status === "COMPLETED"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-rose-500/10 text-rose-500"
                  }`}
                >
                  {b.status}
                </span>

                {b.status === "CONFIRMED" && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleUpdateStatus(b.id, "COMPLETED")}
                      className="p-1.5 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Mark as Completed"
                    >
                      <DoneAll sx={{ fontSize: 16 }} />
                      <span className="hidden sm:inline">Complete</span>
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(b.id, "CANCELLED")}
                      className="p-1.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Cancel Booking"
                    >
                      <Close sx={{ fontSize: 16 }} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default OwnerPortal;
