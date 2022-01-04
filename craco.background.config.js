// https://www.npmjs.com/package/@craco/craco
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      paths.appBuild = resolveApp("dist");
      return {
        target: "web",
        resolve: {
          fallback: {
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util/"),
          },
        },
        entry: {
          background: "./src/background/background.js",
        },
        output: {
          filename: "[name].js",
        },
        optimization: {
          runtimeChunk: false,
        },
        plugins: [
          new webpack.ProvidePlugin({
            process: "process/browser",
          }),
        ],
      };
    },
  },
};
