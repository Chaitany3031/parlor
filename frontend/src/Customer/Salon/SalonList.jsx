import { useEffect, useState, useMemo } from "react";
import SalonCard from "./SalonCard";
import { salonApi } from "../../api/apiClient";
import { INITIAL_SALONS } from "../../api/mockData";
import { useBooking } from "../../context/BookingContext";
import { LocationOn, RestartAlt } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const CITIES = ["All", "Kamtha", "Uran", "Mumbai", "Pune", "Bangalore"];

const SalonList = () => {
  const { selectedCity, setSelectedCity, searchQuery, setSearchQuery } = useBooking();

  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("rating"); // 'rating' | 'price-asc' | 'price-desc'

  useEffect(() => {
    let isMounted = true;
    async function fetchSalons() {
      setLoading(true);
      try {
        const data = await salonApi.getAllSalons();
        if (isMounted) setSalons(data);
      } catch {
        if (isMounted) setSalons(INITIAL_SALONS);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchSalons();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter & sort
  const filteredSalons = useMemo(() => {
    return salons
      .filter((s) => {
        const matchesCity =
          selectedCity === "All" || s.city?.toLowerCase() === selectedCity.toLowerCase();
        const matchesQuery =
          !searchQuery.trim() ||
          s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.city?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCity && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "price-asc") return (a.startingPrice || 0) - (b.startingPrice || 0);
        if (sortBy === "price-desc") return (b.startingPrice || 0) - (a.startingPrice || 0);
        return 0;
      });
  }, [salons, selectedCity, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCity("All");
    setSearchQuery("");
    setSortBy("rating");
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-extrabold text-pink-500">
            Verified Partner Studios
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            Top Rated Salons Near You
          </h2>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* City selector pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCity === c
                    ? "bg-pink-500 text-white shadow-sm shadow-pink-500/30"
                    : "bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                {c === "All" ? "All Locations" : c}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold text-gray-700 dark:text-gray-300 outline-none cursor-pointer dark:bg-[#0f172a]"
          >
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Salons Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <CircularProgress size={36} sx={{ color: "#ec4899" }} />
          <p className="text-xs text-gray-400 mt-3">Loading available salons...</p>
        </div>
      ) : filteredSalons.length === 0 ? (
        <div className="py-16 text-center space-y-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 p-8">
          <LocationOn sx={{ fontSize: 40, color: "#ec4899" }} />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            No salons found in {selectedCity}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search criteria or explore salons in nearby areas like Kamtha, Uran, or Mumbai.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-full bg-pink-500 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-pink-500/20"
          >
            <RestartAlt sx={{ fontSize: 16 }} />
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredSalons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SalonList;
