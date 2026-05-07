/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-project-assets-20260504.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'dm168xfkl91xe.cloudfront.net',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  serverExternalPackages: ['mongoose'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = config;