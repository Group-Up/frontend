const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCSSPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-exclude-empty-assets-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCSSPlugin({
      filename: 'styles.[hash].css',
    }),
    new HTMLWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCSSPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
