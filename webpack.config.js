const path = require("path");

module.exports = {
  // Chosen mode tells webpack to use its built-in optimizations accordingly
  mode: "development",
  // Here the application starts executing and webpack starts bundling
  entry: "./client/index.js",
  // options related to how webpack emits results
  output: {
    // target directory for all output files
    path: path.resolve(__dirname, "public"),
    // the filename template for entry chunks
    filename: "bundle.js",
  },
  // configuration regarding modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        // matching conditions for files ending in .js or .jsx
        test: /\.jsx?$/,
        // the loader which should be applied, it'll be resolved relative to the context
        loader: "babel-loader",
      },
      {
        // matching conditions for files ending in .css
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
      },
    ],
  },
};
