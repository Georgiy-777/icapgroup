/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },
    

    i18n: {
      locales: ["en-US", "ru-RU", "uk-UA"],
      defaultLocale: "uk-UA",
    },
  };
  
  module.exports = nextConfig;
  