const withTM = require("next-transpile-modules")(["shared"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname: "**",
      },
    ],
    domains: null,
  },
});
