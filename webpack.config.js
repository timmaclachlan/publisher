//webpack-functions.js
const webpack = require("webpack")

module.exports = {
    plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/}),]
  };