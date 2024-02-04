'use strict'
const path = require('path')

module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      "@root": path.resolve("./src")
    }
  }
}
