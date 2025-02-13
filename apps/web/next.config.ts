import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    dirs: ['app', 'src']
  }
};

export default nextConfig;
