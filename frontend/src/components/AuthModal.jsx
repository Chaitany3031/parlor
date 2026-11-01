import { useState } from "react";
import {
  Dialog,
  IconButton,
  TextField,
  Button,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Close as CloseIcon, SpaOutlined, Bolt } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { useAppTheme } from "../context/ThemeContext";

const AuthModal = () => {
  const { isDark } = useAppTheme();
  const { isAuthModalOpen, setIsAuthModalOpen } = useBooking();
  const { login, signup, demoLogin } = useAuth();

  const [tabIndex, setTabIndex] = useState(0); // 0: Login, 1: Signup
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setErrorMsg("");
    setSuccessMsg("");
  };

  // Login form
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter a valid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");
      try {
        const res = await login(values.email, values.password);
        if (res.success) {
          setSuccessMsg("Welcome back!");
          setTimeout(handleClose, 800);
        } else {
          setErrorMsg(res.message || "Failed to sign in");
        }
      } catch {
        setErrorMsg("Sign in error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  // Signup form
  const signupFormik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      role: "CUSTOMER",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Enter a valid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");
      try {
        const payload = {
          ...values,
          username: values.username || values.email.split("@")[0],
        };
        const res = await signup(payload);
        if (res.success) {
          setSuccessMsg("Account created successfully!");
          setTimeout(handleClose, 800);
        } else {
          setErrorMsg(res.message || "Failed to create account");
        }
      } catch {
        setErrorMsg("Signup error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleQuickDemo = (role) => {
    demoLogin(role);
    setSuccessMsg(`Signed in as demo ${role === "SALON_OWNER" ? "Salon Partner" : "Customer"}`);
    setTimeout(handleClose, 600);
  };

  return (
    <Dialog
      open={isAuthModalOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: isDark ? "#0f172a" : "#ffffff",
          backgroundImage: "none",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
          boxShadow: isDark ? "0 25px 50px -12px rgba(0,0,0,0.7)" : "0 25px 50px -12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <div className="relative p-6 sm:p-8">
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: isDark ? "#94a3b8" : "#64748b",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-pink-500/20 mb-3">
            <SpaOutlined sx={{ fontSize: 26 }} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {tabIndex === 0 ? "Welcome Back" : "Join Angels Parlor"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {tabIndex === 0
              ? "Sign in to manage appointments & exclusive offers"
              : "Discover & book top beauty experiences near you"}
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={(e, val) => {
            setTabIndex(val);
            setErrorMsg("");
            setSuccessMsg("");
          }}
          variant="fullWidth"
          sx={{
            mb: 3,
            minHeight: 40,
            bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            borderRadius: 9999,
            p: 0.5,
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab
            label="Sign In"
            sx={{
              minHeight: 36,
              borderRadius: 9999,
              fontWeight: 600,
              fontSize: "0.85rem",
              ...(tabIndex === 0 && {
                bgcolor: "#ec4899",
                color: "#ffffff !important",
              }),
            }}
          />
          <Tab
            label="Register"
            sx={{
              minHeight: 36,
              borderRadius: 9999,
              fontWeight: 600,
              fontSize: "0.85rem",
              ...(tabIndex === 1 && {
                bgcolor: "#ec4899",
                color: "#ffffff !important",
              }),
            }}
          />
        </Tabs>

        {/* Feedback alerts */}
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {errorMsg}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
            {successMsg}
          </Alert>
        )}

        {/* Login Form */}
        {tabIndex === 0 && (
          <form onSubmit={loginFormik.handleSubmit} className="space-y-4">
            <div>
              <TextField
                fullWidth
                size="small"
                id="login-email"
                name="email"
                label="Email Address"
                value={loginFormik.values.email}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
                helperText={loginFormik.touched.email && loginFormik.errors.email}
              />
            </div>
            <div>
              <TextField
                fullWidth
                size="small"
                type="password"
                id="login-password"
                name="password"
                label="Password"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
                helperText={loginFormik.touched.password && loginFormik.errors.password}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ py: 1.2, mt: 1, fontWeight: 700 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : "Sign In"}
            </Button>
          </form>
        )}

        {/* Signup Form */}
        {tabIndex === 1 && (
          <form onSubmit={signupFormik.handleSubmit} className="space-y-3.5">
            <div>
              <TextField
                fullWidth
                size="small"
                id="signup-fullName"
                name="fullName"
                label="Full Name"
                value={signupFormik.values.fullName}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                error={signupFormik.touched.fullName && Boolean(signupFormik.errors.fullName)}
                helperText={signupFormik.touched.fullName && signupFormik.errors.fullName}
              />
            </div>
            <div>
              <TextField
                fullWidth
                size="small"
                id="signup-email"
                name="email"
                label="Email Address"
                value={signupFormik.values.email}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                error={signupFormik.touched.email && Boolean(signupFormik.errors.email)}
                helperText={signupFormik.touched.email && signupFormik.errors.email}
              />
            </div>
            <div>
              <TextField
                fullWidth
                size="small"
                id="signup-phone"
                name="phone"
                label="Phone Number"
                value={signupFormik.values.phone}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                error={signupFormik.touched.phone && Boolean(signupFormik.errors.phone)}
                helperText={signupFormik.touched.phone && signupFormik.errors.phone}
              />
            </div>
            <div>
              <TextField
                fullWidth
                size="small"
                type="password"
                id="signup-password"
                name="password"
                label="Password"
                value={signupFormik.values.password}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                error={signupFormik.touched.password && Boolean(signupFormik.errors.password)}
                helperText={signupFormik.touched.password && signupFormik.errors.password}
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold block mb-1">I am registering as:</label>
              <RadioGroup
                row
                name="role"
                value={signupFormik.values.role}
                onChange={signupFormik.handleChange}
              >
                <FormControlLabel
                  value="CUSTOMER"
                  control={<Radio size="small" sx={{ color: "#ec4899", "&.Mui-checked": { color: "#ec4899" } }} />}
                  label={<span className="text-xs font-medium">Customer</span>}
                />
                <FormControlLabel
                  value="SALON_OWNER"
                  control={<Radio size="small" sx={{ color: "#8b5cf6", "&.Mui-checked": { color: "#8b5cf6" } }} />}
                  label={<span className="text-xs font-medium">Salon Partner</span>}
                />
              </RadioGroup>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ py: 1.2, mt: 1, fontWeight: 700 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : "Create Account"}
            </Button>
          </form>
        )}

        {/* Quick 1-Click Demo Buttons for Fast Evaluation */}
        <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/10">
          <p className="text-[11px] uppercase tracking-wider text-center text-gray-400 font-semibold mb-3 flex items-center justify-center gap-1">
            <Bolt sx={{ fontSize: 14, color: "#facc15" }} /> Quick 1-Click Testing Demo
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("CUSTOMER")}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 transition-colors text-center cursor-pointer"
            >
              👤 Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("SALON_OWNER")}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-violet-500/10 text-violet-500 hover:bg-violet-500/20 transition-colors text-center cursor-pointer"
            >
              💼 Demo Salon Owner
            </button>
          </div>
        </div>

      </div>
    </Dialog>
  );
};

export default AuthModal;
