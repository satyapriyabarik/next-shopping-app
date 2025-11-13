import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// ✅ CSP directives flattened and trimmed
const csp = [
  "default-src 'self'",
  `script-src 'self' ${isDev ? "'unsafe-eval' 'unsafe-inline'" : "'unsafe-inline'"} https:`,
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https: https://encrypted-tbn0.gstatic.com https://encrypted-tbn1.gstatic.com https://encrypted-tbn2.gstatic.com https://encrypted-tbn3.gstatic.com https://images.unsplash.com https://media.licdn.com",
  "font-src 'self' https:",
  "connect-src 'self' https://next-shopping-app-8ezc.vercel.app https://api.example.com https://my-json-server.typicode.com https://encrypted-tbn0.gstatic.com https://encrypted-tbn1.gstatic.com https://encrypted-tbn2.gstatic.com https://encrypted-tbn3.gstatic.com https://images.unsplash.com https://media.licdn.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    // ✅ one-liner with no line breaks
    value: csp.replace(/\n/g, "").replace(/\s{2,}/g, " "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev,
  buildExcludes: [
    /middleware-manifest\.json$/,
    /_buildManifest\.js$/,
    /_ssgManifest\.js$/,
    /dynamic-css-manifest\.json$/,
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "media.licdn.com" },
      {protocol:"https", hostname:"raw.githubusercontent.com"}
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

export default withPWA(nextConfig);
