const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // Chosen mode tells webpack to use its built-in optimizations accordingly
  mode: "development",
  // Here the application starts executing and webpack starts bundling
  entry: ["@babel/polyfill", "./client/index.js"],
  // options related to how webpack emits results
  output: {
    // target directory for all output files
    path: path.resolve(__dirname, "public"),
    // the filename template for entry chunks
    filename: "bundle.js",
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     // Options similar to the same options in webpackOptions.output
  //     // both options are optional
  //     filename: "[name].css",
  //     chunkFilename: "[id].css",
  //   }),
  // ],
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
        // test: /\.s[ac]ss$/,
        test: /\.css$/,
        exclude: /(node_modules)/,
        // include: path.resolve(__dirname, "public/sass/main.scss"),
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          // MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          // {
          //   loader: "sass-loader",
          //   options: {
          //     // Prefer `node-sass`
          //     implementation: require("node-sass"),
          //     options: {
          //       includePaths: [
          //         path.resolve(__dirname, "public/sass/main.scss"),
          //       ],
          //     },
          //   },
          // },
        ],
      },
    ],
  },
};
