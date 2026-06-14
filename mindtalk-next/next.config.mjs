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
      // Domain retirement: cadabamsmindtalk.com permanently redirects to mindtalk.in.
      // These offsite rules take precedence over the legacy internal redirects below,
      // and the catch-all is last so everything else lands on mindtalk.in's homepage.
      { source: '/', destination: 'https://www.mindtalk.in/', permanent: true },
      { source: '/anxiety', destination: 'https://www.mindtalk.in/illnesses/anxiety', permanent: true },
      { source: '/emotional-reset', destination: 'https://www.mindtalk.in/illnesses/depression', permanent: true },
      { source: '/relationships', destination: 'https://www.mindtalk.in/treatments/couples-therapy', permanent: true },
      { source: '/burnout', destination: 'https://www.mindtalk.in/journeys/burnout-recovery', permanent: true },
      { source: '/team', destination: 'https://www.mindtalk.in/doctors', permanent: true },
      { source: '/quiz', destination: 'https://www.mindtalk.in/assessments', permanent: true },
      // Legacy aliases — pointed straight at their offsite targets (single hop).
      { source: '/home', destination: 'https://www.mindtalk.in/', permanent: true },
      { source: '/stress-anxiety', destination: 'https://www.mindtalk.in/illnesses/anxiety', permanent: true },
      { source: '/workplace', destination: 'https://www.mindtalk.in/journeys/burnout-recovery', permanent: true },
      { source: '/assessment', destination: 'https://www.mindtalk.in/assessments', permanent: true },
      // Catch-all — must stay last.
      { source: '/:path*', destination: 'https://www.mindtalk.in/', permanent: true },
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
