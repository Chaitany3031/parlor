import React from "react";

const Categorycard = ({ handleCategoryClick, isSelected, category }) => {
  return (
    <div
      onClick={handleCategoryClick}
      className={`px-3.5 py-2.5 rounded-2xl cursor-pointer flex items-center gap-3 transition-all duration-200 select-none ${
        isSelected
          ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/25 scale-[1.02]"
          : "bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10"
      }`}
    >
      <img
        className="w-10 h-10 object-cover rounded-xl shadow-sm"
        src={category.image}
        alt={category.name}
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-semibold truncate leading-tight">
          {category.name}
        </h4>
      </div>
    </div>
  );
};

export default Categorycard;
