/** @type {import('next').NextConfig} */

module.exports = {
  nextConfig : {
    reactStrictMode: true,
    swcMinify: true
  },
  experimental: {
    urlImports: ['https://cdnjs.cloudflare.com/ajax/'],
  },
}
// module.exports = nextConfig
