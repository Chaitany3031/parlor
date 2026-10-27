import React from "react";
import { AccessTime, Check, Add, Star } from "@mui/icons-material";
import { useBooking } from "../../../context/BookingContext";

const ServiceCard = ({ service }) => {
  const { isServiceSelected, addService, removeService } = useBooking();

  const isSelected = isServiceSelected(service.id);

  const handleToggle = () => {
    if (isSelected) {
      removeService(service.id);
    } else {
      addService(service);
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-3xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isSelected
          ? "border-pink-500 bg-pink-500/5 shadow-md shadow-pink-500/10"
          : "border-black/5 dark:border-white/10 bg-white dark:bg-[#0f172a] hover:border-pink-500/30"
      }`}
    >
      {/* Service Info */}
      <div className="space-y-1.5 flex-1 pr-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
            {service.name}
          </h3>
          {service.popular && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-500 flex items-center gap-0.5">
              <Star sx={{ fontSize: 11 }} />
              Popular
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        <div className="flex items-center gap-3 pt-1 text-xs">
          <span className="font-extrabold text-sm text-pink-500">
            ₹{service.price}
          </span>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 font-medium">
            <AccessTime sx={{ fontSize: 14 }} />
            {service.duration} mins
          </span>
        </div>
      </div>

      {/* Image & Action */}
      <div className="flex items-center sm:flex-col gap-3 w-full sm:w-28 shrink-0">
        <img
          className="w-16 h-16 sm:w-24 sm:h-20 object-cover rounded-2xl shadow-sm"
          src={service.image}
          alt={service.name}
        />

        <button
          onClick={handleToggle}
          className={`flex-1 sm:w-full py-2 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            isSelected
              ? "bg-pink-500 text-white shadow-sm shadow-pink-500/30"
              : "border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
          }`}
        >
          {isSelected ? (
            <>
              <Check sx={{ fontSize: 15 }} />
              <span>Added</span>
            </>
          ) : (
            <>
              <Add sx={{ fontSize: 15 }} />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
