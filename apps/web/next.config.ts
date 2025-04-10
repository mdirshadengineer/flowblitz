import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    nodeMiddleware: false // allowed only on canary versions
  },
  reactStrictMode: true,
  reactProductionProfiling: true, // TODO: Till v1.0 launch let's keep it
  eslint: {
    dirs: ['src', 'global']
  },
  images: { unoptimized: true } // FIXME: Fix this for production
};

export default nextConfig;
