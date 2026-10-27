import React from "react";
import { Rating, LinearProgress } from "@mui/material";
import { Star } from "@mui/icons-material";

const RatingCard = ({ averageRating = 4.9, totalReviews = 142 }) => {
  const distribution = [
    { stars: 5, pct: 82, count: 116 },
    { stars: 4, pct: 13, count: 18 },
    { stars: 3, pct: 3, count: 5 },
    { stars: 2, pct: 1, count: 2 },
    { stars: 1, pct: 1, count: 1 },
  ];

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-sm space-y-6">
      {/* Big Score Header */}
      <div className="flex items-center gap-4">
        <div className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white font-mono">
          {averageRating}
        </div>
        <div>
          <Rating
            readOnly
            value={averageRating}
            precision={0.5}
            size="medium"
            sx={{ color: "#ec4899" }}
          />
          <p className="text-xs text-gray-400 mt-0.5">
            Based on {totalReviews} verified client reviews
          </p>
        </div>
      </div>

      {/* Breakdown Bars */}
      <div className="space-y-2.5">
        {distribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-3 text-xs">
            <span className="w-8 font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-0.5">
              {item.stars} <Star sx={{ fontSize: 13, color: "#facc15" }} />
            </span>
            <div className="flex-1">
              <LinearProgress
                variant="determinate"
                value={item.pct}
                sx={{
                  height: 8,
                  borderRadius: 9999,
                  bgcolor: "rgba(0,0,0,0.06)",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#ec4899",
                    borderRadius: 9999,
                  },
                }}
              />
            </div>
            <span className="w-8 text-right text-gray-400 font-mono text-[11px]">
              {item.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingCard;
