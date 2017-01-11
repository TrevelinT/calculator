var path = require('path')
var PATHS = {
  bundle: path.resolve(__dirname, 'src', 'main.js'),
  app: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  public: 'dist/'
}

module.exports = {
  entry: {
    bundle: PATHS.bundle
  },
  output: {
    path: PATHS.dist,
    publicPath: PATHS.public,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|vue)$/,
        loaders: ['eslint'],
        include: PATHS.app
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: PATHS.app
      },
      {
        test: /\.vue$/,
        loaders: ['vue'],
        include: PATHS.app
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  }
}
