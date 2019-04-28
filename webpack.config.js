var webpack = require('webpack');
var path = require('path');
var libraryName = 'weather';
var outputFile = libraryName + '.js';

var config = {
  entry: __dirname + '/bin/weather.js',
  devtool: 'source-map',
  target: 'node',
  output: {
    path: __dirname + '/dist',
    filename: outputFile
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        include: /bin/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};

module.exports = config;
