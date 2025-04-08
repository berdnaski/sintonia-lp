/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.CLOUDFLARESTORAGE_DOMAIN],
  },
}

module.exports = nextConfig
