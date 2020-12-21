const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge({
    entry: './src/index.ts',
    mode,
    devtool: 'source-map',
    node: {
      Buffer: false,
      process: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          exclude: [
            path.resolve(__dirname,'node_modules/excalibur')
          ],
          enforce: "pre",
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|bmp)$/,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      sourceMapFilename: '[file].map',
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new CleanWebpackPlugin({}),
      new HtmlWebPackPlugin({
        title: 'Excalibur Webpack Sample'
      })
    ]
  },
  modeConfig(mode)
  );
};
