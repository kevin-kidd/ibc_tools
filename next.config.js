/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = {
  nextConfig,
  async redirects() {
    return [
      {
        source: '/stargaze-snapshot',
        destination: '/stargaze/snapshot',
        permanent: true,
      }
    ]
  }
}
