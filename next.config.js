const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  images: {
    domains: ["images2.imgbox.com", "i.imgur.com"],
  },
  webpack: function (config) {
    config.plugins.push(new CompressionPlugin());

    return config;
  },
};
