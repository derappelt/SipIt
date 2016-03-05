const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/SipIt.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};
