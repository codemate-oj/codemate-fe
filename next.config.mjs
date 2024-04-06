/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true, // 允许Image提供SVG而非img
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    typedRoutes: true, // 为<Link />添加基于Routes的强类型
  },
};

export default nextConfig;
