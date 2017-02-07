var path = require('path');
var webpack = require('webpack');

module.exports = [
  {
    entry: './src/app/index.jsx',
    output: { path: __dirname, filename: 'dist/bundle.js' },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Tether: "tether"
      })
    ],
    module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    }
  },
  {
    entry: './src/css/main.scss',
    output: { path: __dirname, filename: 'dist/bundle.css' },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ["style","css","sass"]
        },
        {
            test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            loader: 'file?limit=100000&name=./assets/[ext]/[hash].[ext]'
        }
      ]
    }
  }
];
