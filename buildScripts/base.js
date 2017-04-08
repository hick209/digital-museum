const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (path, outputPath) => ({
  entry: {
    app: './src/app.js',
  },
  output: {
    path: outputPath,
    filename: path.join('js', '[name].[chunkhash].js'),
    // publicPath: '/',
    sourceMapFilename: '[name].[chunkhash].map',
  },
  // resolve: {
  //   extensions: ['.js', '.json'],
  //   modules: [ path.join(__dirname, 'src'), 'node_modules' ]
  // },
  module: {
    loaders: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.hbs',
      chunksSortMode: 'dependency',
    }),
    new CopyWebpackPlugin([
      // Copy app icons
      { from: './res/icons', to: 'icons' },
      // Application Manifest
      { from: './src/manifest.json' },
      // Dynamic block for Microsoft
      { from: './src/browserconfig.xml' },
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: path.join('js', 'commons.[chunkhash].js'),
    }),

    // new ForkCheckerPlugin(),
  ]
})
