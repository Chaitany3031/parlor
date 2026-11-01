import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import React, { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";
import { getBannerVideoUrl } from "../../config/imagekit";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  const totalVideos = 4;
  const mainVdRef = useRef(null);
  const nextVdRef = useRef(null);
  const miniVdRef = useRef(null);

  // Guarantee muted state and auto-play on mount and when currentIndex changes
  useEffect(() => {
    if (mainVdRef.current) {
      mainVdRef.current.defaultMuted = true;
      mainVdRef.current.muted = true;
      mainVdRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

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
    }, 1500);
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
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            if (nextVdRef.current) {
              nextVdRef.current.defaultMuted = true;
              nextVdRef.current.muted = true;
              nextVdRef.current.play().catch(() => {});
            }
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
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
      borderRadius: "0% 0% 40% 10%",
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
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-pink-500 transition-opacity duration-300">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-pink-500"
      >
        <div>
          {/* Center mini preview video */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-top scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
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
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onCanPlay={() => setLoading(false)}
                />
              </div>
            </VideoPreview>
          </div>

          {/* Scale-up transition video */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            id="next-video"
            className="absolute-center invisible absolute z-20   size-64 object-cover object-center"
          />

          {/* Main background video */}
          <video
            ref={mainVdRef}
            key={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className="absolute left-0 top-0 size-full object-cover object-center"
            onCanPlay={() => setLoading(false)}
          />
        </div>

        

        <div className="opacity-51 absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-pink-500">
              <b>A</b>ngels
            </h1>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-pink-500">
          P<b>A</b>RLOUR
        </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-pink-500">
              Embrace your beauty with Us
            </p>

            <Button
              id="watch-trailer"
              title="Visit US"
              leftIcon={<TiLocationArrow />}
              containerClass="flex-center gap-1"
            />
          </div>
          <div className="textPart absolute flex flex-col items-center justify-center inset-0 text-pink-500 z-20 space-y-3 px-5">
            <h1 className="text-5xl font-bold">B UR SELF</h1>
            <p className="text-pink-500 text-2xl text-center font-semibold">Discover and Book Beauty, wellness near you</p>
            <input className="border-none bg-pink-300 rounded-md py-4 w-[15rem] md:w-[33rem] outline-none text-black px-5" type="text" placeholder="search here" name="" id="" />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        P<b>A</b>RLOUR
      </h1>
    </div>
  );
};

export default Banner;
