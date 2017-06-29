const HtmlWebpackPlugin = require('html-webpack-plugin')

const vendor = ['react', 'react-dom', 'axios']
const chunkNames = ['common', 'vendor', 'manifest']

const getHtmlPlugins = (entry) => {
  return entry.map(page => new HtmlWebpackPlugin({
    chunks: ['manifest', 'vendor', 'common', page],
    template: 'public/index.html',
    filename: `${page}.html`,
    title: `${page} page`
  }))
}

module.exports = {
  vendor,
  chunkNames,
  getHtmlPlugins
}
