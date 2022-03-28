/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["docs.metamask.io", "aws1.discourse-cdn.com", "openseauserdata.com"],
  },
};

module.exports = nextConfig;
