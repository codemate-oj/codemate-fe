/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/user/setting",
        destination: "/user/setting/info",
        permanent: true,
      },
    ];
  },
  rewrites: async () => {
    const ret = [
      {
        source: "/file/:path*",
        destination: `${process.env.CDN_PREFIX ?? "https://cdn.aioj.net/"}:path*`,
      },
    ];
    if (process.env.NODE_ENV === "development" || process.env.IS_VERCEL) {
      ret.push({
        source: "/api/:path*",
        destination: `${process.env.API_URL ?? "https://api.aioj.net/"}:path*`,
      });
    }
    return ret;
  },
  images: {
    dangerouslyAllowSVG: true, // 允许Image提供SVG而非img
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        hostname: "cdn.aioj.net",
      },
      {
        hostname: "www.aioj.net",
      },
      {
        hostname: "api.aioj.net",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "yaml-loader",
    });
    return config;
  },
};

export default nextConfig;
