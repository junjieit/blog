const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')

const base = require('./webpack.config.prod')

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(),
  ]
})