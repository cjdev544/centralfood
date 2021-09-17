const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  distDir: "build",
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
});
