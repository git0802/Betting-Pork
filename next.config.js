const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.resolve.fallback = { fs: false, path: false };
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  i18n: {
    locales: ["ID", "EN"],
    defaultLocale: "ID",
    localeDetection: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "image/avif",
      "image/webp",
      "imgstack.net",
      "res.cloudinary.com",
      "cdn-static.queenmakergames.co",
      "img.zhenqinghua.com",
      "api-egame-staging.sgplay.net",
      "app-test.insvr.com",
      "api.prerelease-env.biz",
      "cdn-test.techbodia.dev",
      "gp-winfast888.17mybet.com",
      "cdn-test.cdn568.net",
      "ibb.co",
      "i.imgur.com",
      "www.google.com",
      "ix-gaming.s3.ap-southeast-1.amazonaws.com",
      "merchantapi.hugedolphin.com",
      "media.gettyimages.com",
      "apiv3.apifootball.com",
      "s3.ap-southeast-1.amazonaws.com",
      "staging-media-playnation.s3.ap-southeast-1.amazonaws.com",
      "media-playnation.s3.ap-southeast-1.amazonaws.com",
      "www.youtube.com"
    ],
  }
});
