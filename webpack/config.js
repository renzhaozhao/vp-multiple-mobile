const HtmlWebpackPlugin = require('html-webpack-plugin')

const vendor = ['react', 'react-dom', 'axios']
const chunkNames = ['common', 'vendor', 'manifest']

const getChunks = page => ['manifest', 'vendor', 'common', page]


const getHtmlPlugins = (entry, env) => {

  if (env === 'dev') {
    return entry.map(page => new HtmlWebpackPlugin({
      chunks: getChunks(page),
      template: 'public/index.html',
      filename: `${page}.html`,
      title: `${page} page`
    }))
  }

  return entry.map(page => new HtmlWebpackPlugin({
    chunks: getChunks(page),
    template: 'public/index.html',
    filename: `${page}.html`,
    title: `${page} page`,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }))
}

module.exports = {
  vendor,
  chunkNames,
  getHtmlPlugins
}
