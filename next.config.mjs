/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['strapicms.fly.dev', 'pub-bf0bb2bde95c4695afcb00fdfac07418.r2.dev'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: 'strapicms.fly.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-bf0bb2bde95c4695afcb00fdfac07418.r2.dev',
      },
    ],
  },
};
export default nextConfig;
