/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wzsafksvknonxjohjkkf.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
