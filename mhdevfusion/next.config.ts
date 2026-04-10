import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
    qualities: [75, 85],
  },
  allowedDevOrigins: ['169.254.83.107'],
};

export default nextConfig;
