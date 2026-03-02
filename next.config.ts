import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack: {
    root: __dirname,
  },

  async rewrites(){
    return [
      {
        source: '/api/:path*',
        destination: 'https://payroll.politekniklp3i-tasikmalaya.ac.id/:path*',
      }
    ]
  }
};


export default nextConfig;