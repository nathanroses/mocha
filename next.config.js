/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed redirects as we're linking directly to /api/auth/* endpoints
  
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add this to fix image loading issues
  images: {
    domains: ['uploadthing-prod.s3.us-west-2.amazonaws.com'],
  },
}

module.exports = nextConfig
