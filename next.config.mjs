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
    ];
  },
};

export default nextConfig;