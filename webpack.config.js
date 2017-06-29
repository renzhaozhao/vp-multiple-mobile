const webpack = require('webpack')
const { resolve } = require('path')
const autoprefixer = require('autoprefixer')

const entry = require('./webpack/entry')
const {
  vendor,
  chunkNames,
  getHtmlPlugins
} = require('./webpack/config')


const getEntry = (entry) => {
  return entry.reduce((res, val) => {
    res[val] = [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      `./src/pages/${val}/index.js`
    ]
    return res
  }, {})
}

module.exports = {
  entry: Object.assign({}, getEntry(entry), {
    vendor: vendor
  }),
  output: {
    filename: 'static/js/[name].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ]
            })]
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    }, {
      test: /\.(png|jpg|gif|ico)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: 'image/[hash:8].[ext]'
        }
      }]
    }]
  },
  plugins: [
    ...getHtmlPlugins(entry),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: chunkNames
    })
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    host: 'localhost',
    port: 3200,
    inline: true,
    hot: true,
  }
}
