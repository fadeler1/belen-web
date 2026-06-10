import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  devIndicators: false,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/search.html", destination: "/search", permanent: true },
      { source: "/categoria.html", destination: "/categoria", permanent: true },
      { source: "/producto.html", destination: "/producto", permanent: true },
    ];
  },
};

export default nextConfig;
