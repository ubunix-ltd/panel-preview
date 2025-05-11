
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qjjklyugfxbxgwqhanfs.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 86400, // 1 day in seconds
  },
};

export default nextConfig;