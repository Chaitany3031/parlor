import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import React, { useEffect, useRef, useState } from "react";
import { VolumeUp, VolumeOff, PlayArrow } from "@mui/icons-material";
import { useBooking } from "../../context/BookingContext";
import { getBannerVideoUrl } from "../../config/imagekit";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const { setCurrentView } = useBooking();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const totalVideos = 4;
  const mainVdRef = useRef(null);
  const nextVdRef = useRef(null);
  const miniVdRef = useRef(null);

  // Guarantee muted state and auto-play on mount and when currentIndex changes
  useEffect(() => {
    if (mainVdRef.current) {
      mainVdRef.current.defaultMuted = isMuted;
      mainVdRef.current.muted = isMuted;
      mainVdRef.current.play().catch(() => {});
    }
  }, [currentIndex, isMuted]);

  useEffect(() => {
    if (miniVdRef.current) {
      miniVdRef.current.defaultMuted = true;
      miniVdRef.current.muted = true;
      miniVdRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  // Safety fallback so spinner never hangs if network slows metadata
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 0.9,
          ease: "power2.inOut",
          onStart: () => {
            if (nextVdRef.current) {
              nextVdRef.current.defaultMuted = isMuted;
              nextVdRef.current.muted = isMuted;
              nextVdRef.current.play().catch(() => {});
            }
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 30% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => getBannerVideoUrl(index);

  return (
    <div className="relative h-[85vh] sm:h-dvh w-full overflow-hidden bg-slate-950">
      {/* Loading animation */}
      {loading && (
        <div className="flex-center absolute z-[100] h-full w-full overflow-hidden bg-slate-950 transition-opacity duration-300">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-full w-full overflow-hidden bg-slate-950"
      >
        <div>
          {/* Center interactive preview video thumbnail */}
          <div className="mask-clip-path absolute-center absolute z-50 size-48 sm:size-64 cursor-pointer overflow-hidden rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md">
            <div
              onClick={handleMiniVdClick}
              className="origin-top scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 relative group"
            >
              <video
                ref={miniVdRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                autoPlay
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                id="current-video"
                className="size-48 sm:size-64 origin-center scale-150 object-cover object-center"
                onCanPlay={() => setLoading(false)}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-pink-500/80 px-2.5 py-1 rounded-full">
                  Next Look ({((currentIndex % totalVideos) + 1)}/{totalVideos})
                </span>
              </div>
            </div>
          </div>

          {/* Scale-up transition video */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />

          {/* Main background video */}
          <video
            ref={mainVdRef}
            key={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className="absolute left-0 top-0 size-full object-cover object-center brightness-60"
            onCanPlay={() => setLoading(false)}
          />
        </div>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-black/60 z-30 pointer-events-none" />

        {/* Foreground Content */}
        <div className="absolute inset-0 z-40 flex flex-col justify-between p-6 sm:p-12 max-w-7xl mx-auto">
          
          {/* Top Tag & Mute */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
              <span>Spring & Summer Collection '26</span>
            </div>

            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/15 transition-colors cursor-pointer"
              title={isMuted ? "Unmute Video" : "Mute Video"}
            >
              {isMuted ? <VolumeOff sx={{ fontSize: 18 }} /> : <VolumeUp sx={{ fontSize: 18 }} />}
            </button>
          </div>

          {/* Center Main Hero Heading & Pitch */}
          <div className="max-w-2xl space-y-4 my-auto">
            <h1 className="hero-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none drop-shadow-md">
              BE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500">YOURSELF</span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-200 font-medium max-w-lg drop-shadow">
              Discover and book world-class beauty, bespoke hair artistry, and holistic spa rituals in Kamtha, Uran & Mumbai.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCurrentView("salons");
                  window.scrollTo({ top: 500, behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-sm shadow-xl shadow-pink-500/40 hover:shadow-pink-500/60 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book Appointment</span>
                <TiLocationArrow className="text-lg" />
              </button>
              <button
                onClick={handleMiniVdClick}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <PlayArrow sx={{ fontSize: 16 }} />
                <span>Next Look ({currentIndex}/{totalVideos})</span>
              </button>
            </div>
          </div>

          {/* Bottom Indicators */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-semibold text-white/80">
              Angels Flagship Studios • Uran & Kamtha
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? "w-6 bg-pink-500" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
