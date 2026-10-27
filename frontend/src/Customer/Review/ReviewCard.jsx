import React from "react";
import { Avatar, Rating, IconButton } from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const ReviewCard = ({ review, onDelete }) => {
  const { user } = useAuth();

  const isAuthor = user && Number(user.id) === Number(review.userId);

  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="p-5 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-sm space-y-3 transition-all hover:border-pink-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            src={review.userAvatar}
            alt={review.userName}
            sx={{
              width: 42,
              height: 42,
              bgcolor: "#ec4899",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            {review.userName?.[0]?.toUpperCase() || "C"}
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                {review.userName || "Verified Guest"}
              </h4>
              <span className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                <CheckCircle sx={{ fontSize: 11, mr: 0.3 }} />
                Verified
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">{formattedDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Rating
            readOnly
            value={review.rating || 5}
            precision={0.5}
            size="small"
            sx={{ color: "#ec4899" }}
          />
          {isAuthor && onDelete && (
            <IconButton
              size="small"
              onClick={() => onDelete(review.id)}
              sx={{ color: "#ef4444" }}
              title="Delete your review"
            >
              <Delete fontSize="small" />
            </IconButton>
          )}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        "{review.reviewText}"
      </p>
    </div>
  );
};

export default ReviewCard;
