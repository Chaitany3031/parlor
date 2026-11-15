// Centralized API Client for Spring Cloud Gateway (Port 5000)
// Seamlessly connects with microservices and falls back gracefully to rich offline/demo data.

import {
  INITIAL_SALONS,
  INITIAL_CATEGORIES,
  INITIAL_SERVICES,
  INITIAL_REVIEWS,
  INITIAL_BOOKINGS,
  AVAILABLE_TIME_SLOTS,
} from "./mockData";

export const API_BASE_URL =
  import.meta.env.VITE_API_GATEWAY_URL || "";

// Helper to safely execute fetch with timeout
async function safeFetch(url, options = {}, timeoutMs = 2500) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// Local persistent storage keys for fallback demo mode
const STORAGE_KEYS = {
  SALONS: "parlor_salons_cache",
  BOOKINGS: "parlor_bookings_cache",
  REVIEWS: "parlor_reviews_cache",
  USER: "parlor_auth_user",
  TOKEN: "parlor_auth_token",
};

// Local storage fallback helpers
function getLocalItem(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn("Storage error", e);
  }
}

// ------------------------------------
// AUTH API
// ------------------------------------
export const authApi = {
  async login(email, password) {
    try {
      const res = await safeFetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      return res;
    } catch (err) {
      console.info("Gateway auth/login not reachable, falling back to local session:", err.message);
      // Fallback demo user
      const isOwner = email.toLowerCase().includes("owner") || email.toLowerCase().includes("salon");
      const mockUser = {
        id: isOwner ? 2 : 1,
        fullName: isOwner ? "Angel Salon Manager" : "Kaveri Sharma",
        username: email.split("@")[0] || "user",
        email: email,
        phone: "+91 98201 23456",
        role: isOwner ? "SALON_OWNER" : "CUSTOMER",
      };
      const mockToken = "mock_jwt_token_" + Date.now();
      return {
        jwt: mockToken,
        role: mockUser.role,
        message: "Demo login successful (Offline fallback)",
        user: mockUser,
      };
    }
  },

  async signup(data) {
    try {
      const res = await safeFetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res;
    } catch (err) {
      console.info("Gateway auth/signup not reachable, falling back:", err.message);
      const mockUser = {
        id: Date.now(),
        fullName: data.fullName || "User",
        username: data.username || data.email.split("@")[0],
        email: data.email,
        phone: data.phone || "+91 98765 43210",
        role: data.role || "CUSTOMER",
      };
      return {
        jwt: "mock_jwt_token_" + Date.now(),
        role: mockUser.role,
        message: "Registration successful (Offline demo)",
        user: mockUser,
      };
    }
  },

  async getProfile(token) {
    try {
      return await safeFetch(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      return null;
    }
  },
};

// ------------------------------------
// SALON API
// ------------------------------------
export const salonApi = {
  async getAllSalons() {
    try {
      const data = await safeFetch(`${API_BASE_URL}/api/salons`);
      if (Array.isArray(data) && data.length > 0) return data;
      return getLocalItem(STORAGE_KEYS.SALONS, INITIAL_SALONS);
    } catch {
      return getLocalItem(STORAGE_KEYS.SALONS, INITIAL_SALONS);
    }
  },

  async getSalonById(id) {
    try {
      const data = await safeFetch(`${API_BASE_URL}/api/salons/${id}`);
      if (data && data.id) return data;
      const all = getLocalItem(STORAGE_KEYS.SALONS, INITIAL_SALONS);
      return all.find((s) => String(s.id) === String(id)) || INITIAL_SALONS[0];
    } catch {
      const all = getLocalItem(STORAGE_KEYS.SALONS, INITIAL_SALONS);
      return all.find((s) => String(s.id) === String(id)) || INITIAL_SALONS[0];
    }
  },

  async searchSalons(city) {
    try {
      const data = await safeFetch(`${API_BASE_URL}/api/salons/search?city=${encodeURIComponent(city)}`);
      if (Array.isArray(data) && data.length > 0) return data;
      const all = getLocalItem(STORAGE_KEYS.SALONS, INITIAL_SALONS);
      return all.filter((s) => s.city.toLowerCase().includes(city.toLowerCase()));
    } catch {
      const all = getLocalItem(STORAGE_KEYS.SALONS, INITIAL_SALONS);
      return all.filter((s) => s.city.toLowerCase().includes(city.toLowerCase()));
    }
  },

  async getSalonByOwner(token) {
    try {
      return await safeFetch(`${API_BASE_URL}/api/salons/owner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      return INITIAL_SALONS[0];
    }
  },
};

// ------------------------------------
// CATEGORY API
// ------------------------------------
export const categoryApi = {
  async getCategoriesBySalon(salonId) {
    try {
      const data = await safeFetch(`${API_BASE_URL}/api/categories/salon/${salonId}`);
      if (Array.isArray(data) && data.length > 0) return data;
      return INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  },
};

// ------------------------------------
// SERVICE OFFERING API
// ------------------------------------
export const serviceApi = {
  async getServicesBySalon(salonId, categoryId = null) {
    try {
      let url = `${API_BASE_URL}/api/service-offering/salon/${salonId}`;
      if (categoryId) url += `?categoryId=${categoryId}`;
      const data = await safeFetch(url);
      if (Array.isArray(data) && data.length > 0) return data;
      return categoryId
        ? INITIAL_SERVICES.filter((s) => Number(s.categoryId) === Number(categoryId))
        : INITIAL_SERVICES;
    } catch {
      return categoryId
        ? INITIAL_SERVICES.filter((s) => Number(s.categoryId) === Number(categoryId))
        : INITIAL_SERVICES;
    }
  },

  async getServiceById(id) {
    try {
      return await safeFetch(`${API_BASE_URL}/api/service-offering/${id}`);
    } catch {
      return INITIAL_SERVICES.find((s) => s.id === Number(id)) || INITIAL_SERVICES[0];
    }
  },

  async getServicesByIds(ids) {
    try {
      const idStr = Array.from(ids).join(",");
      const data = await safeFetch(`${API_BASE_URL}/api/service-offering/list/${idStr}`);
      if (Array.isArray(data) && data.length > 0) return data;
      return INITIAL_SERVICES.filter((s) => ids.includes(s.id));
    } catch {
      return INITIAL_SERVICES.filter((s) => ids.includes(s.id));
    }
  },
};

// ------------------------------------
// REVIEW API
// ------------------------------------
export const reviewApi = {
  async getReviewsBySalon(salonId) {
    try {
      const data = await safeFetch(`${API_BASE_URL}/api/reviews/salon/${salonId}`);
      if (Array.isArray(data) && data.length > 0) return data;
      const cached = getLocalItem(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
      return cached.filter((r) => Number(r.salonId) === Number(salonId));
    } catch {
      const cached = getLocalItem(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
      return cached.filter((r) => Number(r.salonId) === Number(salonId));
    }
  },

  async createReview(salonId, reviewData, token) {
    try {
      return await safeFetch(`${API_BASE_URL}/api/reviews/salon/${salonId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(reviewData),
      });
    } catch (err) {
      console.info("Review backend offline, creating local review:", err.message);
      const newReview = {
        id: Date.now(),
        reviewText: reviewData.reviewText,
        rating: reviewData.reviewRating || reviewData.rating || 5,
        salonId: Number(salonId),
        userId: 1,
        userName: reviewData.userName || "You (Verified Customer)",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        createdAt: new Date().toISOString(),
      };
      const current = getLocalItem(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
      const updated = [newReview, ...current];
      setLocalItem(STORAGE_KEYS.REVIEWS, updated);
      return newReview;
    }
  },
};

// ------------------------------------
// BOOKING API
// ------------------------------------
export const bookingApi = {
  async getSlots(salonId, date) {
    try {
      const data = await safeFetch(`${API_BASE_URL}/api/bookings/slots/salon/${salonId}/date/${date}`);
      if (Array.isArray(data) && data.length > 0) return data;
      return AVAILABLE_TIME_SLOTS;
    } catch {
      return AVAILABLE_TIME_SLOTS;
    }
  },

  async createBooking({ salonId, paymentMethod, serviceIds, date, timeSlot, user, salon, services, token }) {
    try {
      const startTime = `${date}T${timeSlot ? timeSlot.replace(" AM", "").replace(" PM", "") : "11:00"}:00`;
      const res = await safeFetch(
        `${API_BASE_URL}/api/bookings?salonId=${salonId}&paymentMethod=${paymentMethod || "RAZORPAY"}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            serviceIds,
            startTime,
          }),
        }
      );
      return res;
    } catch (err) {
      console.info("Booking backend offline, saving locally:", err.message);
      const totalPrice = services.reduce((acc, s) => acc + (s.price || 0), 0);
      const bookingCode = `ANGEL-${Math.floor(10000 + Math.random() * 90000)}`;

      const newBooking = {
        id: Date.now(),
        salonId: Number(salonId),
        salonName: salon?.name || "Angels Luxury Parlor",
        salonAddress: salon?.address || "Kamtha, Uran",
        salonPhone: salon?.phoneNo || "+91 98201 23456",
        salonImage: salon?.images?.[0] || INITIAL_SALONS[0].images[0],
        customerId: user?.id || 1,
        customerName: user?.fullName || "Valued Customer",
        customerEmail: user?.email || "customer@parlor.com",
        serviceIds,
        serviceNames: services.map((s) => s.name),
        startTime: `${date} ${timeSlot}`,
        endTime: `${date}`,
        totalPrice,
        status: "CONFIRMED",
        paymentMethod: paymentMethod || "RAZORPAY",
        paymentStatus: paymentMethod === "CASH" ? "PAY_AT_SALON" : "PAID",
        bookingCode,
        createdAt: new Date().toISOString(),
      };

      const existing = getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
      const updated = [newBooking, ...existing];
      setLocalItem(STORAGE_KEYS.BOOKINGS, updated);

      return {
        booking: newBooking,
        payment_link_url: null,
        message: "Booking confirmed successfully!",
      };
    }
  },

  async getCustomerBookings(token) {
    try {
      const data = await safeFetch(`${API_BASE_URL}/api/bookings/customer`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(data) && data.length > 0) return data;
      return getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    } catch {
      return getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    }
  },

  async cancelBooking(bookingId) {
    const existing = getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    const updated = existing.map((b) =>
      b.id === Number(bookingId) ? { ...b, status: "CANCELLED" } : b
    );
    setLocalItem(STORAGE_KEYS.BOOKINGS, updated);
    return true;
  },

  async updateBookingStatus(bookingId, status) {
    try {
      return await safeFetch(`${API_BASE_URL}/api/bookings/${bookingId}/status?status=${status}`, {
        method: "PUT",
      });
    } catch {
      const existing = getLocalItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
      const updated = existing.map((b) =>
        b.id === Number(bookingId) ? { ...b, status } : b
      );
      setLocalItem(STORAGE_KEYS.BOOKINGS, updated);
      return { id: bookingId, status };
    }
  },
};
