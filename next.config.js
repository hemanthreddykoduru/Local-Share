/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  // Security headers are handled by firebase.json (Firebase Hosting)
  // The headers() function is not compatible with output: 'export' static sites
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
