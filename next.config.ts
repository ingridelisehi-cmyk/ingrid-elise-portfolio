import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/vero-moda", destination: "/vero-moda/index.html" }];
  },
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
