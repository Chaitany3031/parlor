# Angels Luxury Parlor - Sleek React Frontend

A sleek, minimal, and high-performance frontend for the **Salon Booking Microservices Platform** (Spring Cloud Gateway, User, Salon, Category, Service Offering, Booking, Payment, Review, and Notification microservices).

---

## ✨ Features & Highlights

- **🌓 Dark & Light Mode Support**
  - Instant theme toggle with animated sun/moon icon.
  - Deep obsidian dark palette (`#090d16` / `#0f172a`) with subtle glassmorphic glow.
  - Minimal editorial light palette (`#ffffff` / `#f8fafc`) with refined typography.
  - Cohesive synchronization across Tailwind CSS v4, MUI v7 Theme Provider, and HTML root with `localStorage` persistence.

- **💎 Sleek, Minimal Navigation & Layout**
  - Sticky glassmorphic navigation bar with location filter pill (Kamtha, Uran, Mumbai, Pune, Bangalore).
  - Live Selected Services cart badge in header with duration & price counters.
  - Quick view switcher between **Home**, **Explore Salons**, **My Bookings**, and **Partner Portal**.

- **🎬 GSAP-Powered Cinematic Hero**
  - Fluid video transition carousel using ImageKit media assets and GSAP ScrollTrigger.
  - Audio mute/unmute toggle, video look indicator pills, and interactive preview thumbnail.
  - Floating Quick Search bar with City, Service keyword, and instant discovery.

- **💇 Service Category & Salon Discovery**
  - Visual category cards (Hair Styling, Facials & Skin Glow, Nails & Manicure, Body Spa & Massage, Bridal & Makeover, Waxing).
  - Filterable salon list with city pills, search input, and sorting (Top Rated, Price Low-High, Price High-Low).
  - Modern salon cards with photo carousels, open status badges, opening hours, verified badges, and starting rates.

- **💆 Salon Details & Booking Flow**
  - High-res photo gallery with verified studio badge.
  - Tabs: **Treatments & Menu**, **Reviews & Ratings**, and **About & Amenities**.
  - Dynamic category selector + treatments list with "+ Add" / "✓ Added" state.
  - Floating/Drawer Cart summary with live calculation of total time (e.g. `1h 45m`) and total bill (₹).
  - Multi-step booking wizard:
    1. Services Breakdown
    2. Date & Available Time Slot selector (Morning, Afternoon, Evening)
    3. Payment Method: UPI / Razorpay, Card / Stripe, Pay at Salon
    4. Instant Digital Appointment Pass with reference ID (e.g. `ANGEL-98214`), QR placeholder, and copy reference button.

- **⭐ Reviews & Ratings**
  - Overall score with 5-star distribution progress bars.
  - Verified client reviews with avatars and timestamps.
  - Interactive "Write a Review" form with Formik and interactive star rating.

- **📅 "My Bookings" Dashboard**
  - Filter by Upcoming, Completed, and Cancelled.
  - Appointment passes with schedule, salon contact, service breakdown, and cancellation option.

- **💼 Salon Partner / Owner Portal**
  - Live studio KPIs: Total Revenue, Active Bookings, Total Customers, Rating.
  - Appointments management: Mark bookings as completed or cancelled in real time.

- **🔐 Authentication & Resilient Backend Integration**
  - Connects to Spring Cloud Gateway on `http://localhost:5000`.
  - Sign In & Register modal with role selection (`CUSTOMER` vs `SALON_OWNER`).
  - 1-Click **Demo Customer** and **Demo Salon Owner** buttons for instant testing.
  - **Graceful Fallback**: If backend services are offline, the frontend seamlessly uses rich realistic local data so the entire user journey works without interruption.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Backend Microservices Integration

| Service | Port | Gateway Route |
| :--- | :--- | :--- |
| **Gateway Server** | `5000` | `http://localhost:5000` |
| **User Service** | `5001` | `/auth/**`, `/api/users/**` |
| **Salon Service** | `5002` | `/api/salons/**` |
| **Category Service** | `5003` | `/api/categories/**` |
| **Service Offering** | `5004` | `/api/service-offering/**` |
| **Booking Service** | `5005` | `/api/bookings/**` |
| **Payment Service** | `5006` | `/api/payments/**` |
| **Notifications** | `5007` | `/api/notifications/**` |
| **Review Service** | `5008` | `/api/reviews/**` |

To start the backend microservices, run the PowerShell script from the root directory:
```powershell
.\start-all.ps1
```
