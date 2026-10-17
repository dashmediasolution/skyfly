import type { NextConfig } from "next";

const nextConfig: NextConfig = {
async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "skyflywithus.com",
          },
        ],
        destination: "https://www.skyflywithus.com/:path*",
        permanent: true,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    // This explicitly tells Next.js to expose this variable to the app's process
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // <-- ADD THIS LINE
      },
    ],
    qualities: [75, 100],
  },
  
};

export default nextConfig;
