/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const NODE_ENV= process.env.NODE_ENV || 'development';

const contextFilePath= NODE_ENV=="development"? "./":"./modules/calendar";
const libraryTargetType= NODE_ENV=="development"? "umd":"commonjs2";
const outputFilePath= NODE_ENV=="development"? "./docs":"./commonjs";

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template  : `${__dirname}/src/index.html`,
  filename  : "index.html",
  inject    : "body"
});

const config = {
  mode: NODE_ENV,
  context: path.join(__dirname, contextFilePath ),
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, outputFilePath),
    filename: 'bundle.js',
    libraryTarget: libraryTargetType
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
    ]
  },
  devServer: {
    compress: true,
    historyApiFallback   : true,
    contentBase          : "./src",
    port                 : 8080,
    inline               : true,
    useLocalIp           : false,
    disableHostCheck     : false
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new MiniCssExtractPlugin({
      filename: "/css/[name].css"
    }),
    new webpack.ProvidePlugin({
      React: "react"
    })
  ],
  externals: {
    ...NODE_ENV=="development"? {}:{'react': 'commonjs react'},
  }
};

module.exports = [config];