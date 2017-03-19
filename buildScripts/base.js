const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (path, outputPath) => ({
  entry: {
    app: './src/app.js',
  },
  output: {
    path: outputPath,
    filename: path.join('js', '[name].bundle.js'),
    // publicPath: '/',
    sourceMapFilename: '[name].map',
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
    ],
    // rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   use: [
      //     {
      //       loader: 'babel'
      //     }
      //   ]
      // }
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: `file?name=[path][name].[ext]&context=/src`
      //     }
      //   ]
      // }
      // {
      //   test: /\.ts$/,
      //   use: [
      //     'awesome-typescript-loader',
      //     'angular2-template-loader'
      //   ],
      //   exclude: [/\.(spec|e2e)\.ts$/]
      // },
      // {
      //   test: /\.css$/,
      //   use: ['to-string-loader', 'css-loader']
      // },
      // {
      //   test: /\.(jpg|png|gif)$/,
      //   use: 'file-loader'
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|svg)$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       limit: 100000
      //     }
      //   }
      // }
    // ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.hbs',
      chunksSortMode: 'dependency',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: path.join('js', 'commons.bundle.js'),
    }),

    // new ForkCheckerPlugin(),
  ]
});
