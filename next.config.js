/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sign-in',
        destination: '/api/auth/login',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: '/api/auth/register',
        permanent: true,
      },
    ]
  },

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, webpack }
  ) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    
    // Add additional problematic packages here if needed
    // Example: config.resolve.alias['package-name'] = false
    
    return config
  },
  
  // Add this option to ignore specific modules
  transpilePackages: ['pdf-parse'],
}

module.exports = nextConfig
