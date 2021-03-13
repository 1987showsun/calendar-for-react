/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const NODE_ENV  = process.env.NODE_ENV  || 'production';
const NODE_MODE = process.env.NODE_MODE || 'nomal';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template  : `${__dirname}/src/index.html`,
  filename  : "index.html",
  inject    : "body"
});

const config = {
  mode: NODE_ENV,
  ...NODE_MODE=="common" && {context: path.join(__dirname, `/src/modules/calendar` )},
  entry: ['@babel/polyfill', NODE_MODE=="nomal"? "./src/index.js":"./index.js"],
  output: {
    path: path.resolve(__dirname, NODE_MODE=="nomal"? './docs':'./commonjs'),
    library: "BrowserRouter",
    filename: './index.js',
    libraryTarget: NODE_MODE=="nomal"? "umd":"commonjs2"
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