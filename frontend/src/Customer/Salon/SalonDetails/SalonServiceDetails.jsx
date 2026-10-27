import React, { useState, useEffect, useMemo } from "react";
import Categorycard from "./Categorycard";
import ServiceCard from "./ServiceCard";
import SelectedServiceList from "./SelectedServiceList";
import { Button, Divider, CircularProgress } from "@mui/material";
import {
  ShoppingCart,
  RemoveShoppingCart,
  CalendarMonth,
  Search,
  Spa,
} from "@mui/icons-material";
import { useBooking } from "../../../context/BookingContext";
import { categoryApi, serviceApi } from "../../../api/apiClient";
import { INITIAL_CATEGORIES, INITIAL_SERVICES } from "../../../api/mockData";

const SalonServiceDetails = () => {
  const {
    selectedSalon,
    selectedServices,
    totalPrice,
    totalDuration,
    setIsBookingModalOpen,
  } = useBooking();

  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // null means All
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [searchFilter, setSearchFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const salonId = selectedSalon?.id || 1;

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      try {
        const [cats, servs] = await Promise.all([
          categoryApi.getCategoriesBySalon(salonId),
          serviceApi.getServicesBySalon(salonId),
        ]);
        if (isMounted) {
          if (Array.isArray(cats) && cats.length > 0) setCategories(cats);
          if (Array.isArray(servs) && servs.length > 0) setServices(servs);
        }
      } catch {
        if (isMounted) {
          setCategories(INITIAL_CATEGORIES);
          setServices(INITIAL_SERVICES);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [salonId]);

  // Filter services by category and keyword
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesCat =
        selectedCategoryId === null || Number(s.categoryId) === Number(selectedCategoryId);
      const matchesSearch =
        !searchFilter.trim() ||
        s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        s.description.toLowerCase().includes(searchFilter.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [services, selectedCategoryId, searchFilter]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-6">
      
      {/* Left Column: Categories Sidebar */}
      <section className="lg:w-[26%] space-y-2 shrink-0">
        <h3 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-3 px-1">
          Service Categories
        </h3>

        {/* All Treatments Pill */}
        <div
          onClick={() => setSelectedCategoryId(null)}
          className={`px-3.5 py-2.5 rounded-2xl cursor-pointer flex items-center gap-3 transition-all duration-200 select-none ${
            selectedCategoryId === null
              ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/25 scale-[1.02]"
              : "bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/10"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold">
            <Spa sx={{ fontSize: 20 }} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold truncate leading-tight">
              All Treatments
            </h4>
            <span className="text-[10px] opacity-75">
              {services.length} services available
            </span>
          </div>
        </div>

        {/* Dynamic Category Cards */}
        <div className="space-y-1.5 pt-1">
          {categories.map((cat) => (
            <Categorycard
              key={cat.id}
              category={cat}
              isSelected={selectedCategoryId === cat.id}
              handleCategoryClick={() => setSelectedCategoryId(cat.id)}
            />
          ))}
        </div>
      </section>

      {/* Center Column: Service Offerings */}
      <section className="lg:w-[48%] space-y-4">
        {/* Search bar inside menu */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <Search sx={{ color: "#ec4899", fontSize: 18 }} />
          <input
            type="text"
            placeholder="Search treatments (e.g., Balayage, Gold Facial)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-medium outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
          />
        </div>

        {/* Services List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <CircularProgress size={30} sx={{ color: "#ec4899" }} />
            <p className="text-xs text-gray-400 mt-2">Loading salon services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-8 text-center space-y-2 rounded-2xl bg-black/5 dark:bg-white/5">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              No services found
            </p>
            <p className="text-xs text-gray-400">
              Try searching with another keyword or pick a different category.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* Right Column: Selected Services / Booking Panel */}
      <section className="lg:w-[26%] shrink-0">
        <div className="sticky top-24 p-5 rounded-3xl bg-white dark:bg-[#0f172a] border border-black/10 dark:border-white/10 shadow-lg shadow-black/5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center">
              <ShoppingCart sx={{ fontSize: 18 }} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Selected Treatments
              </h4>
              <p className="text-[11px] text-gray-400">
                {selectedServices.length}{" "}
                {selectedServices.length === 1 ? "treatment" : "treatments"}
              </p>
            </div>
          </div>

          <Divider />

          {selectedServices.length > 0 ? (
            <div>
              <SelectedServiceList />

              <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 text-xs space-y-1.5 mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>Estimated Duration:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    ⏳ {totalDuration}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Total Amount:
                  </span>
                  <span className="text-base font-extrabold text-pink-500">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<CalendarMonth />}
                onClick={() => setIsBookingModalOpen(true)}
                sx={{ py: 1.3, fontWeight: 700 }}
              >
                Schedule Appointment
              </Button>
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center mx-auto">
                <RemoveShoppingCart sx={{ fontSize: 24 }} />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed px-2">
                Click "+ Add" on any treatment above to begin scheduling your appointment.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default SalonServiceDetails;
