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

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
