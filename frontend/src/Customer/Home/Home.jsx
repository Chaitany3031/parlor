import Banner from "./Banner";
import QuickSearch from "./QuickSearch";
import ServiceCategoryGrid from "./ServiceCategoryGrid";
import SalonList from "../Salon/SalonList";
import {
  Verified,
  Spa,
  AccessTime,
  CheckCircle,
  ArrowForward,
} from "@mui/icons-material";
import { useBooking } from "../../context/BookingContext";

const Home = () => {
  const { setCurrentView } = useBooking();

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Banner with GSAP Video preview and dark/light support */}
      <section>
        <Banner />
      </section>

      {/* 2. Floating Quick Search Bar */}
      <section>
        <QuickSearch />
      </section>

      {/* 3. Service Category Grid */}
      <section>
        <ServiceCategoryGrid />
      </section>

      {/* 4. Luxury Curated Collage & Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Text & Features */}
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest font-extrabold text-pink-500">
              The Angels Standard
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Where Couture Styling Meets Mindful Wellness
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Every appointment is more than a service—it’s an intentional ritual. From Korean glass-skin facials to Paris-trained balayage colorists, step into spaces curated for your tranquility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-white">
                  <Verified sx={{ fontSize: 18, color: "#ec4899" }} />
                  <span>Master Artists</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Certified aestheticians with 5+ years of high-fashion & luxury studio mastery.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-white">
                  <Spa sx={{ fontSize: 18, color: "#ec4899" }} />
                  <span>Botanical Care</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Cruelty-free, sulfate-free & organic dermatological formulations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-white">
                  <AccessTime sx={{ fontSize: 18, color: "#ec4899" }} />
                  <span>Zero Wait Time</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Guaranteed VIP chair availability right at your scheduled booking minute.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-white">
                  <CheckCircle sx={{ fontSize: 18, color: "#ec4899" }} />
                  <span>Instant Booking</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Seamless payment via UPI, Cards, or pay in person at the studio.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentView("salons");
                  window.scrollTo({ top: 500, behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Find Studios Near You</span>
                <ArrowForward sx={{ fontSize: 16 }} />
              </button>
            </div>
          </div>

          {/* Right Image Collage Grid */}
          <div className="grid grid-cols-2 gap-3 h-[380px] sm:h-[480px]">
            <div className="space-y-3">
              <div className="h-[60%] rounded-3xl overflow-hidden shadow-lg group">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
                  alt="Styling studio"
                />
              </div>
              <div className="h-[37%] rounded-3xl overflow-hidden shadow-md group">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
                  alt="Manicure spa"
                />
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <div className="h-[37%] rounded-3xl overflow-hidden shadow-md group">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
                  alt="Facial skincare"
                />
              </div>
              <div className="h-[60%] rounded-3xl overflow-hidden shadow-lg group">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
                  alt="Hair balayage"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Featured Salons Listing Section */}
      <section>
        <SalonList />
      </section>
    </div>
  );
};

export default Home;
