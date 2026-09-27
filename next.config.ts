import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is used for the full-screen zoom view (and the homepage background)
    qualities: [75, 90],
  },
};

export default nextConfig;
