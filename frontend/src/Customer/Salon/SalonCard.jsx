import React from "react";
import { Star, LocationOn, AccessTime, ArrowForward } from "@mui/icons-material";
import { useBooking } from "../../context/BookingContext";

const SalonCard = ({ salon }) => {
  const { navigateToSalon } = useBooking();

  if (!salon) return null;

  const coverImage =
    salon.images?.[0] ||
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80";

  return (
    <div
      onClick={() => navigateToSalon(salon)}
      className="group rounded-3xl overflow-hidden bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer"
    >
      {/* Image Container with Badges */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
        <img
          src={coverImage}
          alt={salon.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-black/75 backdrop-blur-md text-gray-900 dark:text-white flex items-center gap-1 shadow-sm">
            <LocationOn sx={{ fontSize: 13, color: "#ec4899" }} />
            {salon.city}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/90 text-white shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Open Now
          </span>
        </div>

        {/* Rating Floating Tag */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
          <Star sx={{ fontSize: 15, color: "#facc15" }} />
          <span>{salon.rating || 4.9}</span>
          <span className="opacity-70 text-[10px]">({salon.reviewCount || 120})</span>
        </div>
      </div>

      {/* Salon Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-pink-500 transition-colors line-clamp-1">
            {salon.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
            {salon.address}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {(salon.tags || ["Premium", "Unisex"]).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hours & Starting Price */}
        <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <AccessTime sx={{ fontSize: 13 }} />
            <span>{salon.openTime || "09:00"} - {salon.closeTime || "21:30"}</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-400 block -mb-1">Starts at</span>
            <span className="text-sm font-extrabold text-pink-500">
              ₹{salon.startingPrice || 499}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateToSalon(salon);
          }}
          className="w-full py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-600 text-gray-800 dark:text-gray-200 group-hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>View Treatments & Book</span>
          <ArrowForward sx={{ fontSize: 14 }} />
        </button>
      </div>
    </div>
  );
};

export default SalonCard;
