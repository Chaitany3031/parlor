import React from "react";
import { INITIAL_CATEGORIES } from "../../api/mockData";
import { useBooking } from "../../context/BookingContext";
import { Spa, ContentCut, Face, Brush, CleanHands, AutoFixHigh } from "@mui/icons-material";

const CATEGORY_ICONS = {
  1: <ContentCut sx={{ fontSize: 24 }} />,
  2: <Face sx={{ fontSize: 24 }} />,
  3: <CleanHands sx={{ fontSize: 24 }} />,
  4: <Spa sx={{ fontSize: 24 }} />,
  5: <AutoFixHigh sx={{ fontSize: 24 }} />,
  6: <Brush sx={{ fontSize: 24 }} />,
};

const ServiceCategoryGrid = () => {
  const { setCurrentView, setSearchQuery } = useBooking();

  const handleCategoryClick = (categoryName) => {
    setSearchQuery(categoryName.split(" ")[0]);
    setCurrentView("salons");
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-extrabold text-pink-500">
            Bespoke Treatments
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            What are you looking for today?
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          Certified specialists and organic formulations tailored to reveal your unique glow.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {INITIAL_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 p-3 sm:p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 hover:border-pink-500/40"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-3 shadow-md relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1 text-white">
                {CATEGORY_ICONS[cat.id] || <Spa sx={{ fontSize: 18 }} />}
              </div>
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 group-hover:text-pink-500 transition-colors line-clamp-1">
              {cat.name}
            </h3>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5">
              Explore services →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCategoryGrid;
