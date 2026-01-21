/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Ignore tailwindcss if not available
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules\/.*tailwindcss/ },
    ];
    return config;
  },
};

module.exports = nextConfig;
