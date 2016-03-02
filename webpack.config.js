module.exports = {
  entry: './app/SipIt.ts',
  output: {
    path: __dirname,
<<<<<<< Updated upstream
    filename: "./dist/bundle.js"
=======
    filename: "dist/bundle.js"
>>>>>>> Stashed changes
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