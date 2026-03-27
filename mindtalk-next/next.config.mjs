/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cadabamsmindtalk.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/stress-anxiety', destination: '/anxiety', permanent: true },
      { source: '/workplace', destination: '/burnout', permanent: true },
      { source: '/depression', destination: '/emotional-reset', permanent: true },
      { source: '/assessment', destination: '/quiz', permanent: true },
      { source: '/app', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
