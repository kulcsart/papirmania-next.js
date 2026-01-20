/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    disableStaticImages: true,
  },
};
export default nextConfig;
