/** @type {import('next').NextConfig} */
const nextConfig = {
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
        protocol: "https",
        hostname: "cdn.aioj.net",
        port: "",
        pathname: "/file/**",
      },
      {
        protocol: "https",
        hostname: "www.aioj.net",
        port: "",
        pathname: "/file/**",
      },
      {
        protocol: "https",
        hostname: "api.aioj.net",
        port: "",
        pathname: "/file/**",
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
