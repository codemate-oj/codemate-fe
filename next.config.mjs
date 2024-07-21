/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    if (process.env.NODE_ENV === "development" || process.env.IS_VERCEL) {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.API_URL ?? "https://api.aioj.net/"}:path*`,
        },
      ];
    }
    return [];
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
