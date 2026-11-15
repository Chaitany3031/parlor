import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import VideoPreview from "./VideoPreview";

const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export const DEFAULT_BANNER_IMAGES = [
  // {
  //   url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85",
  //   // title: "Luxury Hair Studio",
  //   // subtitle: "Couture Cuts, Balayage & Glaze",
  //   // tag: "Hair Styling"
  // },
  // {
  //   url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=85",
  //   // title: "Aesthetic Skin & Spa",
  //   // subtitle: "Hydra-Facials, Massages & Deep Glow",
  //   // tag: "Spa & Wellness"
  // },
  // {
  //   url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=2000&q=85",
  //   // title: "Bridal Glamour",
  //   // subtitle: "Exquisite Transformations For Your Big Day",
  //   // tag: "Bridal Makeup"
  // },
  // {
  //   url: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=2000&q=85",
  //   // title: "Nail Lounge & Art",
  //   // subtitle: "Gel Extensions, French Tips & Care",
  //   // tag: "Nail Bar"
  // },
  {
    url: "https://ik.imagekit.io/adog2xkpn/parlor/Screenshot%202026-11-01%20192644.png",
    // title: "Angels Signature Care",
    // subtitle: "Indulge in Premium Pampering & Relaxation",
    // tag: "Full Salon"
  }
];

/**
 * ImageBanner: A luxury slideshow hero banner for the Angels Parlour homepage.
 *
 * Supports:
 * - Custom images passed via props: Array of URLs or { url, title, subtitle, tag }
 * - Automatic slideshow with pause on hover
 * - Interactive Next/Prev arrow buttons
 * - Clickable thumbnail preview & dot pagination
 * - GSAP curved scroll animation matching the project aesthetic
 * - Search bar and hero action buttons
 */
const ImageBanner = ({
  images = DEFAULT_BANNER_IMAGES,
  autoPlay = true,
  interval = 4500,
  onSearch,
}) => {
  // Normalize images prop (support both string URLs and objects)
  const slides = (images && images.length > 0 ? images : DEFAULT_BANNER_IMAGES).map((item) =>
    typeof item === "string" ? { url: item, title: "Angels Parlour", subtitle: "Embrace your beauty with Us" } : item
  );

  const totalSlides = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  // Preload first few images and dismiss loading state
  useEffect(() => {
    let loadedCount = 0;
    const toPreload = slides.slice(0, 3);
    toPreload.forEach((slide) => {
      const img = new Image();
      img.src = slide.url;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount >= 1) setLoading(false);
      };
      img.onerror = () => {
        setLoading(false);
      };
    });

    const timeout = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timeout);
  }, [slides]);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, interval, nextSlide]);

  // GSAP ScrollTrigger clip-path animation matching original Banner
  useGSAP(() => {
    const el = document.getElementById("image-banner-frame");
    if (!el) return;
    gsap.set("#image-banner-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#image-banner-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#image-banner-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const nextIndex = (currentIndex + 1) % totalSlides;
  const currentSlide = slides[currentIndex] || slides[0];
  const nextSlideItem = slides[nextIndex] || slides[0];

  return (
    <div
      className="relative h-dvh w-screen overflow-x-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading state */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-pink-500 transition-opacity duration-300">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Main framed container */}
      <div
        id="image-banner-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-pink-900"
      >
        {/* Slideshow image layers */}
        <div className="absolute inset-0 size-full">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.url + idx}
                className={`absolute inset-0 size-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={slide.url}
                  alt={slide.title || `Slide ${idx + 1}`}
                  className={`size-full object-contain transition-transform duration-[6000ms] ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            );
          })}

          {/* Luxury dual-tone overlay for high contrast readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
          <div className="absolute inset-0 z-10 bg-pink-300 mix-blend-multiply" />
        </div>

        {/* Center interactive Next Look preview (matching Banner mini preview) */}
        <div className="mask-clip-path absolute-center absolute z-30 size-56 sm:size-64 cursor-pointer overflow-hidden rounded-xl shadow-2xl transition-all duration-300 hover:scale-105">
          {/* <VideoPreview>
            <div
              onClick={nextSlide}
              title="Click to view next look"
              className="group relative size-56 sm:size-64 overflow-hidden rounded-xl border border-white/30 backdrop-blur-sm"
            >
              <img
                src={nextSlideItem.url}
                alt="Next slide"
                className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              /> */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white"> */}
                {/* <span className="text-[10px] tracking-widest uppercase font-semibold text-pink-300">
                  Next Look &bull; {nextIndex + 1}/{totalSlides}
                </span> */}
                {/* <p className="text-xs font-bold line-clamp-1">{nextSlideItem.title}</p> */}
                {/* <span className="text-[10px] text-pink-200 underline mt-0.5 opacity-90 group-hover:opacity-100">
                  Tap to preview &rarr;
                </span> */}
              {/* </div> */}
            {/* </div>
          </VideoPreview> */}
        </div>

        {/* Left / Right Carousel Navigation Buttons */}
        {/* <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-pink-600/80 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
        >
          <ChevronLeftIcon />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-pink-600/80 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
        >
          <ChevronRightIcon />
        </button> */}

        {/* Foreground Content & Typography */}
        <div className="absolute left-0 top-0 z-30 size-full pointer-events-none">
          {/* Top Header Branding */}
          <div className="mt-24 px-5 sm:px-10 pointer-events-auto">
            <h1 className="special-font hero-heading text-pink-400 drop-shadow-md">
              <b>A</b>ngels
            </h1>

            <p className="mb-4 max-w-72 font-robert-regular text-pink-500 text-sm sm:text-base drop-shadow">
              Embrace your beauty with Us 
              {/* &bull; {currentSlide.tag || "Luxury Salon"} */}
            </p>

            <Button
              // className='cursor-pointer'
              // sx={{cursor:"pointer"}}
              id="visit-us-banner-btn"
              title="Visit US"
              leftIcon={<TiLocationArrow />}
              containerClass="flex-center gap-1 shadow-md hover:bg-pink-900"
              onClick={() => {
                // const el = document.getElementById("salon-list-section") || document.querySelector("section");
                // el?.scrollIntoView({ behavior: "smooth" });
                
              }}
            />
          </div>

          {/* Centered Search Card */}
          <div className="textPart absolute flex flex-col items-center justify-center inset-0 z-20 space-y-3 px-5 pointer-events-auto">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 backdrop-blur-md text-pink-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>{currentSlide.tag || ""}</span>
              <span>&bull;</span>
              <span>{currentSlide.title}</span>
            </div> */}

            {/* <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg text-center">
              B UR SELF
            </h1> */}

            {/* <p className="text-pink-300 text-lg sm:text-2xl text-center font-medium drop-shadow max-w-xl">
              Discover and Book Beauty &amp; Wellness near you
            </p> */}

            <div className="relative w-[18rem] sm:w-[28rem] md:w-[34rem] mt-2 shadow-2xl">
              <input
                className="w-full bg-pink-300 focus:bg-white text-gray-900 placeholder-gray-600 rounded-full py-4 pl-6 pr-24 outline-none border-2 border-pink-300 focus:border-pink-500 transition-all duration-300 text-sm sm:text-base shadow-inner"
                type="text"
                placeholder="Search haircuts, facials, bridal makeup..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && onSearch) onSearch(searchTerm);
                }}
              />
              <button
                type="button"
                onClick={() => onSearch && onSearch(searchTerm)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow"
              >
                Search
              </button>
            </div>
          </div>

          {/* Bottom Right Title */}
          <h1 className="special-font hero-heading absolute bottom-21 right-6 z-20 text-pink-400 drop-shadow-md">
            P<b>A</b>RLOUR
          </h1>

          {/* Bottom Navigation Indicators & Play/Pause Control */}
          <div className="absolute bottom-6 left-6 sm:left-10 z-40 flex items-center gap-3 pointer-events-auto">
            {/* Play/Pause toggle */}
            {/* <button
              onClick={() => setIsPlaying((p) => !p)}
              className="p-2 rounded-full bg-black/50 hover:bg-pink-600 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
              aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button> */}

            {/* Slide Index Badge */}
            {/* <span className="text-xs font-mono font-bold text-pink-300 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
              0{currentIndex + 1} / 0{totalSlides}
            </span> */}

            {/* Dot indicators */}
            {/* <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === currentIndex
                      ? "w-7 bg-pink-500 shadow-sm"
                      : "w-2 bg-white/40 hover:bg-white/80"
                  }`}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>

      {/* Decorative background bottom watermark */}
      {/* <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        P<b>A</b>RLOUR
      </h1> */}
    </div>
  );
};

export default ImageBanner;
