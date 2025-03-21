/** @type {import('next').NextConfig} */
const path = require('path');

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
    // Explicitly mock problematic modules
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: path.resolve(__dirname, './mocks/canvas.js'),
      encoding: false,
      'canvas-prebuilt': path.resolve(__dirname, './mocks/canvas.js'),
      'pdfjs-dist': path.resolve(__dirname, 'node_modules/pdfjs-dist'),
    }

    // Ignore specific files/libraries that cause build issues
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /node_modules\/canvas/,
          use: 'null-loader'
        }
      ]
    }

    return config
  },
  
  // Ignore ESLint errors during build (still show warnings)
  eslint: {
    // Warning: This allows production builds to successfully complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
