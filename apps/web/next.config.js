const withTM = require("next-transpile-modules")(["shared"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "expert-matcher-s3-bucket.s3.eu-central-1.amazonaws.com",
      },
    ],
    domains: null,
  },
});
