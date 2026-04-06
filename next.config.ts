import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
  images: { formats: ["image/avif", "image/webp"] },
  compress: true,
  poweredByHeader: false,
};
export default nextConfig;
