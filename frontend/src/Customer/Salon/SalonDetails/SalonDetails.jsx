import { useState } from "react";
import SalonDetail from "./SalonDetail";
import SalonServiceDetails from "./SalonServiceDetails";
import Review from "../../Review/Review";
import {
  SpaOutlined,
  RateReviewOutlined,
  InfoOutlined,
  CheckCircle,
  Wifi,
  AcUnit,
  LocalParking,
  CreditCard,
  Coffee,
} from "@mui/icons-material";
import { useBooking } from "../../../context/BookingContext";
import { INITIAL_SALONS } from "../../../api/mockData";

const TABS = [
  { id: "services", label: "Treatments & Menu", icon: <SpaOutlined sx={{ fontSize: 18 }} /> },
  { id: "reviews", label: "Reviews & Ratings", icon: <RateReviewOutlined sx={{ fontSize: 18 }} /> },
  { id: "about", label: "About & Amenities", icon: <InfoOutlined sx={{ fontSize: 18 }} /> },
];

const SalonDetails = () => {
  const { selectedSalon } = useBooking();
  const salon = selectedSalon || INITIAL_SALONS[0];

  const [activeTab, setActiveTab] = useState("services");

  const amenities = [
    { icon: <AcUnit sx={{ fontSize: 20 }} />, label: "Air Conditioned Studio" },
    { icon: <Wifi sx={{ fontSize: 20 }} />, label: "High-speed Guest Wi-Fi" },
    { icon: <LocalParking sx={{ fontSize: 20 }} />, label: "Valet / Free Parking" },
    { icon: <CreditCard sx={{ fontSize: 20 }} />, label: "Contactless Card / UPI" },
    { icon: <Coffee sx={{ fontSize: 20 }} />, label: "Herbal Tea & Refreshments" },
    { icon: <CheckCircle sx={{ fontSize: 20 }} />, label: "100% Sanitized Tools" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Salon Header with Gallery & Basic Details */}
      <SalonDetail />

      {/* Tabs Navigation */}
      <div className="mt-8 border-b border-black/5 dark:border-white/10">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-3 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/25"
                    : "bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panes */}
      <div className="mt-4">
        {activeTab === "services" && <SalonServiceDetails />}
        {activeTab === "reviews" && <Review />}
        {activeTab === "about" && (
          <div className="py-8 max-w-4xl space-y-8">
            {/* Story */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                About {salon.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {salon.description ||
                  "Angels Luxury Parlor is dedicated to delivering bespoke head-to-toe beauty experiences. Our internationally trained stylists and licensed aestheticians ensure each ritual is customized for your individual lifestyle, hair type, and skin needs."}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                Studio Amenities & Perks
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center gap-3 text-xs font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <div className="text-pink-500">{item.icon}</div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Schedule */}
            <div className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Operating Schedule
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-600 dark:text-gray-300">
                <div>
                  <span className="text-gray-400 block font-medium">Monday - Friday</span>
                  <span className="font-bold">
                    {salon.openTime || "09:00"} - {salon.closeTime || "21:30"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Saturday - Sunday</span>
                  <span className="font-bold">09:00 - 22:00</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Location</span>
                  <span className="font-bold">{salon.city}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Contact Phone</span>
                  <span className="font-bold">{salon.phoneNo || "+91 98201 23456"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonDetails;
