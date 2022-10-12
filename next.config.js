/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['pages', 'apps', 'interfaces', 'components']
  },
}

module.exports = nextConfig
