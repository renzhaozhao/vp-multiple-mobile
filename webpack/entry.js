const { readdirSync } = require('fs')

const entry = readdirSync('./src/pages')

module.exports = entry
