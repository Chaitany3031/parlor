import {
  Star,
  LocationOn,
  AccessTime,
  Phone,
  Email,
  Share,
  ArrowBack,
  Verified,
} from "@mui/icons-material";
import { useBooking } from "../../../context/BookingContext";
import { INITIAL_SALONS } from "../../../api/mockData";

const SalonDetail = () => {
  const { selectedSalon, setCurrentView } = useBooking();

  const salon = selectedSalon || INITIAL_SALONS[0];

  const galleryImages = salon.images && salon.images.length >= 3
    ? salon.images
    : [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
      ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: salon.name,
        text: `Check out ${salon.name} on Angels Parlor!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6 pt-4 pb-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView("salons")}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-pink-500 transition-colors cursor-pointer"
        >
          <ArrowBack sx={{ fontSize: 16 }} />
          <span>Back to All Salons</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
            title="Share Salon"
          >
            <Share sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden">
        <div className="md:col-span-2 h-[260px] sm:h-[380px] overflow-hidden rounded-2xl sm:rounded-3xl relative group">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={galleryImages[0]}
            alt={salon.name}
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white flex items-center gap-1">
            <Verified sx={{ fontSize: 15, color: "#ec4899" }} />
            <span>Verified Studio Partner</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-[180px] md:h-[380px]">
          <div className="h-full overflow-hidden rounded-2xl group">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src={galleryImages[1] || galleryImages[0]}
              alt={`${salon.name} interior`}
            />
          </div>
          <div className="h-full overflow-hidden rounded-2xl group">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src={galleryImages[2] || galleryImages[0]}
              alt={`${salon.name} services`}
            />
          </div>
        </div>
      </section>

      {/* Salon Info Header */}
      <section className="flex flex-col md:flex-row md:items-start justify-between gap-6 pt-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-2xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
              {salon.name}
            </h1>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-pink-500/10 text-pink-500">
              {salon.city}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <LocationOn sx={{ fontSize: 16, color: "#ec4899" }} />
              {salon.address}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <AccessTime sx={{ fontSize: 16, color: "#ec4899" }} />
              Open: {salon.openTime || "09:00"} - {salon.closeTime || "21:30"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-1">
              <Phone sx={{ fontSize: 15, color: "#ec4899" }} />
              {salon.phoneNo || "+91 98201 23456"}
            </span>
            <span className="flex items-center gap-1">
              <Email sx={{ fontSize: 15, color: "#ec4899" }} />
              {salon.email || "info@angelsparlor.com"}
            </span>
          </div>
        </div>

        {/* Rating & Review summary card */}
        <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-pink-500 text-white flex flex-col items-center justify-center font-bold">
            <span className="text-base leading-none">{salon.rating || 4.9}</span>
            <Star sx={{ fontSize: 12, mt: 0.2 }} />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
              Exceptional Ratings
            </span>
            <span className="text-[11px] text-gray-400">
              Based on {salon.reviewCount || 142} verified appointments
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalonDetail;
