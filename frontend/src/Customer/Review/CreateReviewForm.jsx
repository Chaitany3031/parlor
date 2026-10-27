import { useState } from "react";
import { Rating, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useBooking } from "../../context/BookingContext";
import { reviewApi } from "../../api/apiClient";

const CreateReviewForm = ({ salonId, onReviewCreated }) => {
  const { user, token, isAuthenticated } = useAuth();
  const { setIsAuthModalOpen } = useBooking();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      rating: 5,
      reviewText: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number().min(1, "Please give at least 1 star").required(),
      reviewText: Yup.string()
        .min(10, "Review must be at least 10 characters long")
        .required("Review text is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!isAuthenticated) {
        setIsAuthModalOpen(true);
        return;
      }

      setLoading(true);
      setError("");
      setSuccess(false);

      try {
        const payload = {
          reviewText: values.reviewText,
          reviewRating: values.rating,
          rating: values.rating,
          userName: user?.fullName || "Verified Customer",
        };

        const created = await reviewApi.createReview(salonId, payload, token);
        setSuccess(true);
        resetForm({ values: { rating: 5, reviewText: "" } });
        if (onReviewCreated) {
          onReviewCreated(created);
        }
        setTimeout(() => setSuccess(false), 3000);
      } catch {
        setError("Failed to post review. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/5 dark:border-white/10 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-gray-900 dark:text-white">
        Share Your Experience
      </h3>
      <p className="text-xs text-gray-400 -mt-2">
        Help others discover the finest treatments at this salon
      </p>

      {success && (
        <Alert severity="success" sx={{ borderRadius: 2 }}>
          Thank you! Your review has been published.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Star Rating Selector */}
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
            Overall Rating
          </label>
          <Rating
            name="rating"
            value={Number(formik.values.rating)}
            precision={0.5}
            onChange={(e, val) => formik.setFieldValue("rating", val || 5)}
            size="large"
            sx={{ color: "#ec4899" }}
          />
        </div>

        {/* Review Text */}
        <div>
          <TextField
            fullWidth
            multiline
            rows={3}
            id="reviewText"
            name="reviewText"
            placeholder="Tell us about the ambiance, service quality, stylist expertise..."
            value={formik.values.reviewText}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.reviewText && Boolean(formik.errors.reviewText)}
            helperText={formik.touched.reviewText && formik.errors.reviewText}
            size="small"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ py: 1, px: 4, fontWeight: 700 }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : isAuthenticated ? (
            "Publish Review"
          ) : (
            "Sign In to Review"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateReviewForm;
