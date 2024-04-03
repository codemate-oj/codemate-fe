/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true, // 为<Link />添加基于Routes的强类型
  },
};

export default nextConfig;
