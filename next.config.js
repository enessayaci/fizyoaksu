/** @type {import('next').NextConfig} */

module.exports = {
  nextConfig: {
    reactStrictMode: true,
    swcMinify: true,
  },
  experimental: {
    urlImports: ["https://cdnjs.cloudflare.com/ajax/"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
// module.exports = nextConfig
