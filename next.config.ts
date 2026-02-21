import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'res.cloudinary.com',
        // Specific to your Cloudinary cloud name
        pathname: '/ddozftpka/**', 
      },
    ],
  },

  // 1. Add Headers to fix COOP 404/Security errors
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin', // Prevents cross-origin popups from accessing your window
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp', // Complements COOP for total isolation
          },
        ],
      },
    ];
  },

  /* Webpack configuration remains the same */
  webpack: (config) => {
    return config; 
  },
};

export default nextConfig;