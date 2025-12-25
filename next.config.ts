import type {NextConfig} from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment with RSC support
  output: "standalone",
  basePath: "",
};

export default nextConfig;
