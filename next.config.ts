import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "agesbyhs.com",
      },
    ],
  },
};

export default nextConfig;
