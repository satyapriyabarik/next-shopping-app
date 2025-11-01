import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' ${isDev ? "'unsafe-eval' 'unsafe-inline'" : "'unsafe-inline'"} https:;
      style-src 'self' 'unsafe-inline' https:;
      img-src 'self' data: https:;
      font-src 'self' https:;
      connect-src 'self' https://api.example.com https://my-json-server.typicode.com;
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
    `.replace(/\s{2,}/g, " ").trim(),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

// Base Next.js config
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "treemart.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

// Wrap with PWA
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/, /_buildManifest\.js$/, /_ssgManifest\.js$/, /dynamic-css-manifest\.json$/],
});


export default withPWA(nextConfig);
