/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // Giống site gốc: "/" là tiếng Anh, "/vi" là tiếng Việt
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
    localeDetection: false,
  },
  images: {
    domains: ["api.producthunt.com", "unikorn.vn"],
  },
};

module.exports = nextConfig;
