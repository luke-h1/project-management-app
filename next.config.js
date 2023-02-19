/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt'], // file might be used in server-components
  },
};

module.exports = nextConfig;
