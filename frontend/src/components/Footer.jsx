import React from "react";
import { SpaOutlined, Favorite, Phone, Email, LocationOn } from "@mui/icons-material";
import { useBooking } from "../context/BookingContext";

const Footer = () => {
  const { setCurrentView, setSelectedCity } = useBooking();

  return (
    <footer className="mt-auto border-t border-black/5 dark:border-white/10 bg-slate-50 dark:bg-[#070a11] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-sm">
                <SpaOutlined sx={{ fontSize: 20 }} />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">
                ANGELS <span className="text-pink-500 font-light">PARLOR</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Curated beauty, hair artistry, and mindful wellness therapies. Instant verified appointments at top luxury salons in your neighborhood.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Made with</span>
              <Favorite sx={{ fontSize: 14, color: "#ec4899" }} />
              <span>for self-care lovers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentView("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-pink-500 transition-colors cursor-pointer"
                >
                  Home & Specials
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView("salons");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-pink-500 transition-colors cursor-pointer"
                >
                  Featured Salons
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView("my-bookings");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-pink-500 transition-colors cursor-pointer"
                >
                  My Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView("owner-portal");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-pink-500 transition-colors cursor-pointer text-violet-500 font-medium"
                >
                  Salon Partner Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Top Locations
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              {["Kamtha", "Uran", "Mumbai", "Pune", "Bangalore"].map((city) => (
                <li key={city}>
                  <button
                    onClick={() => {
                      setSelectedCity(city);
                      setCurrentView("salons");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-pink-500 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <LocationOn sx={{ fontSize: 13, color: "#ec4899" }} />
                    Salons in {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Support & Hours
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Customer Concierge available 7 days a week from 09:00 AM to 09:00 PM.
            </p>
            <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Phone sx={{ fontSize: 14, color: "#ec4899" }} />
                <span>+91 98201 23456</span>
              </div>
              <div className="flex items-center gap-2">
                <Email sx={{ fontSize: 14, color: "#ec4899" }} />
                <span>support@angelsparlor.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© 2026 Angels Parlor Platform. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="hover:text-pink-500 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-pink-500 cursor-pointer">Terms of Service</span>
            <span className="hover:text-pink-500 cursor-pointer">Partner With Us</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
