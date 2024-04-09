/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:8888/:path*",
        },
      ];
    }
    return [];
  },
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
