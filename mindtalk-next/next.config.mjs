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
      { source: '/emotional-reset', destination: '/depression', permanent: true },
      { source: '/assessment', destination: '/quiz', permanent: true },
      { source: '/app', destination: '/', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(|anxiety|depression|burnout|relationships)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, s-maxage=86400' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, s-maxage=86400' }],
      },
      {
        source: '/llms.txt',
        headers: [{ key: 'Cache-Control', value: 'public, s-maxage=86400' }],
      },
    ]
  },
}

export default nextConfig
