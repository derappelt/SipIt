module.exports = {
  entry: './app/SipIt.ts',
  output: {
    path: __dirname,
    filename: "./dist/bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};