import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: isProduction,
  },
  async rewrites() {
    // 开发环境下将 /api 请求代理到后端，避免跨域问题
    if (!isProduction) {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.CLIENT_BACKEND}/api/:path*`,
        },
      ];
    }
    return [];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
