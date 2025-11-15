import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Adding allowed image qualities
    qualities: [70, 75],
  },
};

export default nextConfig;
