import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import RatingCard from "./RatingCard";
import CreateReviewForm from "./CreateReviewForm";
import { reviewApi } from "../../api/apiClient";
import { INITIAL_REVIEWS } from "../../api/mockData";
import { useBooking } from "../../context/BookingContext";
import { CircularProgress } from "@mui/material";

const Review = () => {
  const { selectedSalon } = useBooking();
  const salonId = selectedSalon?.id || 1;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchReviews() {
      setLoading(true);
      try {
        const data = await reviewApi.getReviewsBySalon(salonId);
        if (isMounted) {
          setReviews(Array.isArray(data) && data.length > 0 ? data : INITIAL_REVIEWS);
        }
      } catch {
        if (isMounted) setReviews(INITIAL_REVIEWS);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, [salonId]);

  const handleReviewCreated = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleDeleteReview = (reviewId) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : 4.9;

  return (
    <div className="py-6 flex flex-col lg:flex-row gap-8">
      {/* Left Column: Rating breakdown + Review form */}
      <section className="w-full lg:w-[42%] space-y-6">
        <RatingCard averageRating={Number(averageRating)} totalReviews={reviews.length} />
        <CreateReviewForm salonId={salonId} onReviewCreated={handleReviewCreated} />
      </section>

      {/* Right Column: Customer Reviews List */}
      <section className="w-full lg:w-[58%] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Client Testimonials ({reviews.length})
          </h3>
          <span className="text-xs text-gray-400">Sorted by most recent</span>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <CircularProgress size={28} sx={{ color: "#ec4899" }} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-black/5 dark:bg-white/5 text-gray-400 text-xs">
            No reviews yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="space-y-3.5">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} onDelete={handleDeleteReview} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Review;
