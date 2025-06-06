/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sintonia.126563c230465db009a3e05abda65bbe.r2.cloudflarestorage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sintonia.741a8b5617a857fb30e81db5b38cdce6.r2.cloudflarestorage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
