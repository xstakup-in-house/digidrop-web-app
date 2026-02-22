import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    // Option 1: Simple (allows all Cloudinary subdomains)
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'res.cloudinary.com',
        pathname: '/ddozftpka/**',
        // pathname: '**', // optional, allows any path
      },
    ],
  },
  /* config options here */
   webpack: (config) => {
    return config; 
  },
};

export default nextConfig;
