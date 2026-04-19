/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  experimental: {
    workerThreads: true,
  },
}

module.exports = nextConfig
