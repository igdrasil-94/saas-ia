/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@saas/shared', '@saas/ui'],
};

module.exports = nextConfig;
