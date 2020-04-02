const path = require('path')

module.exports = {
  entry: {
    index: './src/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      images: path.resolve(__dirname, '../src/assets/images/')
    }
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, '../src/assets/svg'),
        loader: require.resolve('svg-sprite-loader')
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        include: path.resolve(__dirname, '../src/assets/images'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}