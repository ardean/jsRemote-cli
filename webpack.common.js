const path = require("path");

module.exports = {
  entry: "./client/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.client.json"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "jsremote.js",
    path: path.resolve(__dirname, "dist", "client")
  }
};