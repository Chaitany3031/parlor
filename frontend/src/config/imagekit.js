// ImageKit configuration and asset resolver
export const IMAGEKIT_ENDPOINT =
  import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT ||
  "https://ik.imagekit.io/adog2xkpn/parlor";

// Exact uploaded ImageKit video URLs
export const HERO_VIDEOS = {
  1: "https://ik.imagekit.io/adog2xkpn/parlor/hero-1.mp4?updatedAt=1792941500393",
  2: "https://ik.imagekit.io/adog2xkpn/parlor/hero-2.mp4?updatedAt=1792941479756",
  3: "https://ik.imagekit.io/adog2xkpn/parlor/hero-3.mp4?updatedAt=1792941501989",
  4: "https://ik.imagekit.io/adog2xkpn/parlor/hero-4.mp4?updatedAt=1792941504445",
};

/**
 * Resolves the banner video URL.
 * Returns the exact ImageKit video URL.
 *
 * @param {number} index 1-based video index (1 to 4)
 * @returns {string} Video URL
 */
export const getBannerVideoUrl = (index) => {
  if (HERO_VIDEOS[index]) {
    return HERO_VIDEOS[index];
  }
  if (IMAGEKIT_ENDPOINT) {
    const base = IMAGEKIT_ENDPOINT.replace(/\/+$/, "");
    return `${base}/hero-${index}.mp4`;
  }
  return `/videos/hero-${index}.mp4`;
};

/**
 * Resolves ImageKit images.
 *
 * @param {string} path Image path (e.g., 'hero.png' or 'about.webp')
 * @returns {string} Full ImageKit URL
 */
export const getImageKitUrl = (path) => {
  const cleanPath = path.replace(/^\/+/, "");
  const base = IMAGEKIT_ENDPOINT.replace(/\/+$/, "");
  return `${base}/${cleanPath}`;
};
