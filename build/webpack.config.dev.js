const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    overlay: true, // 错误时，覆盖浏览器
    contentBase: false,
    hot: true,
    contentBase: path.resolve(__dirname, '../', 'public'),
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        ws: true,
        changeOrigin: true,
      },
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    moduleIds: 'named'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development")})
  ]
})