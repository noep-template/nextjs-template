/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  disable: true, // Désactivation forcée du PWA pour test
});

const nextConfig = {
  // Optimisations de performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'gsap'],
  },

  // Configuration de build
  staticPageGenerationTimeout: 20000,
  output: 'standalone',
  compress: true,

  // Optimisations d'images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 an
  },

  // Headers de sécurité et cache
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(withPWA(nextConfig));
