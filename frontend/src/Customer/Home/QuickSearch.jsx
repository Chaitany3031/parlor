import { LocationOn, Search, ArrowForward } from "@mui/icons-material";
import { useBooking } from "../../context/BookingContext";

const CITIES = ["All Cities", "Kamtha", "Uran", "Mumbai", "Pune", "Bangalore"];

const QuickSearch = () => {
  const { selectedCity, setSelectedCity, searchQuery, setSearchQuery, setCurrentView } = useBooking();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentView("salons");
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-8 sm:-mt-12 relative z-30 px-4">
      <form
        onSubmit={handleSearchSubmit}
        className="p-3 sm:p-4 rounded-3xl bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl shadow-black/15 flex flex-col md:flex-row items-center gap-3 transition-all"
      >
        {/* City Filter */}
        <div className="w-full md:w-1/3 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <LocationOn sx={{ color: "#ec4899", fontSize: 20 }} />
          <div className="flex flex-col w-full text-left">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Location
            </span>
            <select
              value={selectedCity === "All" ? "All Cities" : selectedCity}
              onChange={(e) =>
                setSelectedCity(e.target.value === "All Cities" ? "All" : e.target.value)
              }
              className="bg-transparent text-sm font-semibold text-gray-800 dark:text-gray-100 outline-none cursor-pointer w-full dark:bg-[#0f172a]"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Query */}
        <div className="w-full md:w-1/2 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <Search sx={{ color: "#ec4899", fontSize: 20 }} />
          <div className="flex flex-col w-full text-left">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Service or Salon Name
            </span>
            <input
              type="text"
              placeholder="e.g. Haircut, Hydra Facial, Angels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-800 dark:text-gray-100 placeholder:text-gray-400 outline-none w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-sm shadow-md shadow-pink-500/30 hover:shadow-lg hover:shadow-pink-500/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <span>Find Salons</span>
          <ArrowForward sx={{ fontSize: 18 }} />
        </button>
      </form>
    </div>
  );
};

export default QuickSearch;
