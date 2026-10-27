import { useState } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  ShoppingBagOutlined,
  CalendarMonthOutlined,
  Menu as MenuIcon,
  Close as CloseIcon,
  Logout,
  LocationOnOutlined,
  SpaOutlined,
  DashboardOutlined,
} from "@mui/icons-material";
import { useAppTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";

const CITIES = ["All", "Kamtha", "Uran", "Mumbai", "Pune", "Bangalore"];

const Navbar = () => {
  const { isDark, toggleTheme } = useAppTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const {
    currentView,
    setCurrentView,
    selectedCity,
    setSelectedCity,
    selectedServices,
    totalPrice,
    setIsCartDrawerOpen,
    setIsAuthModalOpen,
  } = useBooking();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-[#090d16]/85 border-b border-black/5 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Left: Brand Logo & City Filter */}
          <div className="flex items-center gap-4 lg:gap-8">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform duration-200">
                <SpaOutlined sx={{ fontSize: 22 }} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-gray-900 dark:text-white font-['General_Sans'] flex items-center gap-1">
                  ANGELS <span className="text-pink-500 font-light">PARLOR</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gray-400 dark:text-gray-500 font-semibold -mt-1">
                  Beauty & Wellness
                </span>
              </div>
            </button>

            {/* City Selector Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-medium text-gray-700 dark:text-gray-300">
              <LocationOnOutlined sx={{ fontSize: 16, color: "#ec4899" }} />
              <span>City:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent border-none outline-none text-pink-500 font-semibold cursor-pointer dark:bg-[#090d16]"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavClick("home")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer ${
                currentView === "home"
                  ? "bg-pink-500/10 text-pink-500 font-semibold dark:bg-pink-500/20"
                  : "text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("salons")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer ${
                currentView === "salons" || currentView === "salon-detail"
                  ? "bg-pink-500/10 text-pink-500 font-semibold dark:bg-pink-500/20"
                  : "text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
              }`}
            >
              Explore Salons
            </button>
            <button
              onClick={() => handleNavClick("my-bookings")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer ${
                currentView === "my-bookings"
                  ? "bg-pink-500/10 text-pink-500 font-semibold dark:bg-pink-500/20"
                  : "text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => handleNavClick("owner-portal")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer border ${
                currentView === "owner-portal"
                  ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                  : "border-violet-500/30 text-violet-600 dark:text-violet-400 hover:bg-violet-500/10"
              }`}
            >
              Partner Portal
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <LightMode sx={{ fontSize: 20, color: "#facc15" }} />
              ) : (
                <DarkMode sx={{ fontSize: 20, color: "#6366f1" }} />
              )}
            </button>

            {/* Selected Services / Cart Pill */}
            {selectedServices.length > 0 && (
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-semibold shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 active:scale-95 transition-all cursor-pointer animate-pulse"
              >
                <ShoppingBagOutlined sx={{ fontSize: 16 }} />
                <span>
                  {selectedServices.length} {selectedServices.length === 1 ? "service" : "services"}
                </span>
                <span className="hidden sm:inline opacity-80">• ₹{totalPrice}</span>
              </button>
            )}

            {/* Auth Button or User Menu */}
            {isAuthenticated ? (
              <div>
                <button
                  onClick={handleOpenUserMenu}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: "#ec4899",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {user?.fullName?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                </button>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 200,
                      borderRadius: 3,
                      border: isDark
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.08)",
                      boxShadow: isDark
                        ? "0 10px 25px -5px rgba(0,0,0,0.5)"
                        : "0 10px 25px -5px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <div className="px-4 py-2.5">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-pink-500/10 text-pink-500">
                      {user?.role || "CUSTOMER"}
                    </span>
                  </div>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      handleNavClick("my-bookings");
                      handleCloseUserMenu();
                    }}
                  >
                    <CalendarMonthOutlined sx={{ fontSize: 18, mr: 1.5, color: "#ec4899" }} />
                    <span className="text-sm">My Bookings</span>
                  </MenuItem>
                  {user?.role === "SALON_OWNER" && (
                    <MenuItem
                      onClick={() => {
                        handleNavClick("owner-portal");
                        handleCloseUserMenu();
                      }}
                    >
                      <DashboardOutlined sx={{ fontSize: 18, mr: 1.5, color: "#8b5cf6" }} />
                      <span className="text-sm">Salon Dashboard</span>
                    </MenuItem>
                  )}
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: "#ef4444" }}>
                    <Logout sx={{ fontSize: 18, mr: 1.5 }} />
                    <span className="text-sm">Sign Out</span>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                variant="contained"
                onClick={() => setIsAuthModalOpen(true)}
                sx={{
                  px: 2.5,
                  py: 0.8,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                Sign In
              </Button>
            )}

            {/* Mobile Hamburger Menu */}
            <div className="flex lg:hidden">
              <IconButton
                onClick={() => setMobileDrawerOpen(true)}
                sx={{ color: isDark ? "#ffffff" : "#0f172a" }}
              >
                <MenuIcon />
              </IconButton>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: isDark ? "#090d16" : "#ffffff",
            color: isDark ? "#f8fafc" : "#0f172a",
          },
        }}
      >
        <div className="p-5 flex items-center justify-between border-b border-black/5 dark:border-white/10">
          <span className="font-bold text-pink-500">ANGELS PARLOR</span>
          <IconButton onClick={() => setMobileDrawerOpen(false)} size="small">
            <CloseIcon sx={{ color: isDark ? "#ffffff" : "#0f172a" }} />
          </IconButton>
        </div>
        <div className="p-4 border-b border-black/5 dark:border-white/10">
          <label className="text-xs text-gray-500 font-medium block mb-1.5">Filter by City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium outline-none text-pink-500 dark:bg-[#111827]"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <List sx={{ pt: 2 }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavClick("home")}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavClick("salons")}>
              <ListItemText primary="Explore Salons" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavClick("my-bookings")}>
              <ListItemText primary="My Bookings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavClick("owner-portal")}>
              <ListItemText primary="Partner / Owner Portal" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </header>
  );
};

export default Navbar;
