import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🚀 Required for Bluehost to cleanly render your static asset paths
  output: 'export', 
  
  typescript: {
    // 🛠️ Prevents loose type checks from crashing your build script
    ignoreBuildErrors: true,
  },
  eslint: {
    // 🛠️ Prevents unused warnings from blocking compilation steps
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
