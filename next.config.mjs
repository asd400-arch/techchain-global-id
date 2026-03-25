const nextConfig = {
  output: 'standalone',
  experimental: {
    turbo: {}
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
