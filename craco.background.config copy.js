// const webpack = require("webpack");
 
// https://www.npmjs.com/package/@craco/craco
module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          assert: require.resolve("assert/"),
          util: require.resolve("util/"),
          stream: require.resolve("stream-browserify"),
          crypto: require.resolve("crypto-browserify"),
          timers: require.resolve("timers-browserify"),
          zlib: require.resolve("browserify-zlib"),
          dgram: require.resolve("chrome-dgram"),
          net: require.resolve("chrome-net"),
          dns: require.resolve("chrome-dns"),
          os: require.resolve("os-browserify/browser"),
        },
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  },
  eslint: {
    configure: {
      rules: {
        "no-underscore-dangle": "off",
      },
    },
  },
};