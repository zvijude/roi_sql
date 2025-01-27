/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ['knex'],
  productionBrowserSourceMaps: false, // Disable source maps in production
}

export default nextConfig
