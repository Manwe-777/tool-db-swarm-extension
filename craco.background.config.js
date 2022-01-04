// https://www.npmjs.com/package/@craco/craco
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
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
          background: "./background/background.js",
        },
        output: {
          filename: "[name].js",
          path: resolveApp("build") ,
        },
        optimization: {
          runtimeChunk: false,
        },
      };
    },
  },
};
