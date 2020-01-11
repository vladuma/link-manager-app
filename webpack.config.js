const path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // define entry file and output
  entry: "./src/index.js",
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "main.js",
    publicPath: '/'
  },
  resolve: {
      extensions: [' ', '.js', '.jsx'],
      alias: {
        "@material-ui/styles": path.resolve("./node_modules", "@material-ui/styles"),
      }
  },
  module: {
    rules: [
      { test: /\.jsx?$/, 
        loader: "babel-loader", 
        exclude: /node_modules/,
        options: {
          babelrcRoots: ['.', '../']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000,
    historyApiFallback: true
  }
};