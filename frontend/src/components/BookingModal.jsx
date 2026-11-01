import { useState } from "react";
import {
  Dialog,
  IconButton,
  Button,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  Radio,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircle,
  AccessTime,
  CreditCard,
  AccountBalanceWallet,
  Store,
  ContentCopy,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import { useAppTheme } from "../context/ThemeContext";
import { AVAILABLE_TIME_SLOTS } from "../api/mockData";

const STEPS = ["Services", "Date & Slot", "Payment"];

const BookingModal = () => {
  const { isDark } = useAppTheme();
  const { isAuthenticated } = useAuth();
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    setIsAuthModalOpen,
    selectedSalon,
    selectedServices,
    removeService,
    totalPrice,
    totalDuration,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    confirmBooking,
    activeBookingSuccess,
    setActiveBookingSuccess,
    setCurrentView,
  } = useBooking();

  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setActiveStep(0);
  };

  const handleNext = () => {
    if (activeStep === 0 && selectedServices.length === 0) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleConfirmOrder = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setSubmitting(true);
    try {
      await confirmBooking();
    } finally {
      setSubmitting(false);
    }
  };

  const copyBookingCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // If a booking was just placed successfully, show Digital Pass modal view
  if (activeBookingSuccess) {
    return (
      <Dialog
        open={Boolean(activeBookingSuccess)}
        onClose={() => setActiveBookingSuccess(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            bgcolor: isDark ? "#0f172a" : "#ffffff",
            backgroundImage: "none",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
          },
        }}
      >
        <div className="p-6 sm:p-8 text-center relative">
          <IconButton
            onClick={() => setActiveBookingSuccess(null)}
            size="small"
            sx={{ position: "absolute", right: 16, top: 16 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle sx={{ fontSize: 38 }} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Booking Confirmed!
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Your appointment has been secured at {activeBookingSuccess.salonName}
          </p>

          {/* Digital Pass Card */}
          <div className="mt-6 p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Booking Reference
                </span>
                <p className="text-lg font-black tracking-widest text-pink-500 font-mono">
                  {activeBookingSuccess.bookingCode}
                </p>
              </div>
              <button
                onClick={() => copyBookingCode(activeBookingSuccess.bookingCode)}
                className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 text-xs flex items-center gap-1 cursor-pointer"
                title="Copy Code"
              >
                <ContentCopy sx={{ fontSize: 14 }} />
                <span>{copiedCode ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Salon</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {activeBookingSuccess.salonName}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Schedule</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {activeBookingSuccess.startTime}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Total Amount</span>
                <span className="font-bold text-emerald-500 text-sm">
                  ₹{activeBookingSuccess.totalPrice}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Payment Mode</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 uppercase">
                  {activeBookingSuccess.paymentMethod}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-gray-400 text-xs block mb-1 font-medium">Booked Services:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeBookingSuccess.serviceNames?.map((name, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-500 text-[11px] font-semibold"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setActiveBookingSuccess(null);
                setCurrentView("home");
              }}
              sx={{ py: 1 }}
            >
              Back to Home
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setActiveBookingSuccess(null);
                setCurrentView("my-bookings");
              }}
              sx={{ py: 1, fontWeight: 700 }}
            >
              View in My Bookings
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={isBookingModalOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: isDark ? "#0f172a" : "#ffffff",
          backgroundImage: "none",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
        },
      }}
    >
      <div className="p-6 sm:p-8 relative">
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ position: "absolute", right: 16, top: 16 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Schedule Appointment
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {selectedSalon?.name || "Angels Parlor"} • {selectedSalon?.city || "Kamtha"}
          </p>
        </div>

        {/* Stepper */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 4,
            "& .MuiStepLabel-label": {
              fontSize: "0.75rem",
              fontWeight: 600,
              color: isDark ? "#94a3b8" : "#64748b",
            },
            "& .MuiStepLabel-label.Mui-active": {
              color: "#ec4899",
            },
            "& .MuiStepLabel-label.Mui-completed": {
              color: "#10b981",
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: "#ec4899",
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: "#10b981",
            },
          }}
        >
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 0: Review Selected Services */}
        {activeStep === 0 && (
          <div className="space-y-4">
            <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
              {selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                        {service.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        ⏱️ {service.duration} mins
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-pink-500">
                      ₹{service.price}
                    </span>
                    <button
                      onClick={() => removeService(service.id)}
                      className="text-xs text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Duration & Price Bar */}
            <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Duration</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  ⏳ {totalDuration}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Bill</p>
                <p className="text-lg font-black text-pink-500">₹{totalPrice}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Date & Slot */}
        {activeStep === 1 && (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                1. Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-semibold text-gray-800 dark:text-gray-200 outline-none focus:border-pink-500 transition-colors dark:bg-[#111827]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                2. Choose Time Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {AVAILABLE_TIME_SLOTS.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                        isSelected
                          ? "bg-pink-500 text-white shadow-md shadow-pink-500/30 scale-105"
                          : "bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-pink-500/10 hover:text-pink-500"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 text-xs text-gray-500 flex items-center gap-2">
              <AccessTime sx={{ fontSize: 16, color: "#ec4899" }} />
              <span>
                Appointment: <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>
              </span>
            </div>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Select Preferred Payment Option
            </label>

            <RadioGroup
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="space-y-2.5"
            >
              {/* Razorpay UPI */}
              <div
                onClick={() => setSelectedPaymentMethod("RAZORPAY")}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPaymentMethod === "RAZORPAY"
                    ? "border-pink-500 bg-pink-500/5 shadow-sm"
                    : "border-black/10 dark:border-white/10 hover:border-pink-500/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <AccountBalanceWallet sx={{ fontSize: 22 }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Razorpay / UPI / GPay
                    </h4>
                    <p className="text-xs text-gray-500">Instant verification & cashbacks</p>
                  </div>
                </div>
                <Radio value="RAZORPAY" size="small" sx={{ color: "#ec4899", "&.Mui-checked": { color: "#ec4899" } }} />
              </div>

              {/* Stripe Card */}
              <div
                onClick={() => setSelectedPaymentMethod("STRIPE")}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPaymentMethod === "STRIPE"
                    ? "border-pink-500 bg-pink-500/5 shadow-sm"
                    : "border-black/10 dark:border-white/10 hover:border-pink-500/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <CreditCard sx={{ fontSize: 22 }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Debit / Credit Card (Stripe)
                    </h4>
                    <p className="text-xs text-gray-500">Visa, Mastercard, RuPay & Amex</p>
                  </div>
                </div>
                <Radio value="STRIPE" size="small" sx={{ color: "#ec4899", "&.Mui-checked": { color: "#ec4899" } }} />
              </div>

              {/* Cash at Parlor */}
              <div
                onClick={() => setSelectedPaymentMethod("CASH")}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPaymentMethod === "CASH"
                    ? "border-pink-500 bg-pink-500/5 shadow-sm"
                    : "border-black/10 dark:border-white/10 hover:border-pink-500/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Store sx={{ fontSize: 22 }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Pay at Salon
                    </h4>
                    <p className="text-xs text-gray-500">Pay cash or card upon your arrival</p>
                  </div>
                </div>
                <Radio value="CASH" size="small" sx={{ color: "#ec4899", "&.Mui-checked": { color: "#ec4899" } }} />
              </div>
            </RadioGroup>

            <div className="mt-4 p-4 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Total Payable:</span>
              <span className="text-base font-extrabold text-pink-500">₹{totalPrice}</span>
            </div>
          </div>
        )}

        {/* Modal Controls */}
        <div className="mt-8 flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/10">
          <Button
            variant="text"
            onClick={activeStep === 0 ? handleClose : handleBack}
            sx={{ fontWeight: 600, color: isDark ? "#94a3b8" : "#64748b" }}
            startIcon={activeStep > 0 && <ArrowBack />}
          >
            {activeStep === 0 ? "Cancel" : "Back"}
          </Button>

          {activeStep < STEPS.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={selectedServices.length === 0}
              endIcon={<ArrowForward />}
              sx={{ px: 3, fontWeight: 700 }}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleConfirmOrder}
              disabled={submitting}
              sx={{ px: 4, fontWeight: 700 }}
            >
              {submitting ? <CircularProgress size={20} color="inherit" /> : `Confirm & Pay ₹${totalPrice}`}
            </Button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default BookingModal;
