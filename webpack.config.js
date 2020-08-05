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
        exclude: /(node_modules)/,
        // the loader which should be applied, it'll be resolved relative to the context
        loader: "babel-loader",
      },
      {
        // matching conditions for files ending in .css
        test: /\.s[ac]ss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `node-sass`
              implementation: require("node-sass"),
              sassOptions: {
                includePaths: [path.resolve(__dirname, "sass/main.scss")],
              },
            },
          },
        ],
      },
    ],
  },
};
