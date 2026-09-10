/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Important for Docker deployments
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'f003.backblazeb2.com',
        port: '',
        pathname: '/file/greatergrace/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/webpages/about',
      },
      {
        source: '/academics',
        destination: '/webpages/academics',
      },
      {
        source: '/admissions',
        destination: '/webpages/admissions',
      },
      {
        source: '/facilities',
        destination: '/webpages/facilities',
      },
      {
        source: '/gallery',
        destination: '/webpages/gallery',
      },
      {
        source: '/gallery/events',
        destination: '/webpages/gallery/events',
      },
      {
        source: '/gallery/events/:id',
        destination: '/webpages/gallery/events/:id',
      },
      {
        source: '/gallery/facilities',
        destination: '/webpages/gallery/facilities',
      },
      {
        source: '/contact',
        destination: '/webpages/contact',
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;