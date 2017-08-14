var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var PROD = JSON.parse(process.env.PROD_ENV || '0');


module.exports = [
  {
    entry: './src/app/index.jsx',
    output: {
      path: __dirname,
      filename: PROD? 'dist/bundle.min.js' : 'dist/bundle.js'
    },
    plugins: PROD ? [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Tether: "tether"
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
      ]: [
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
    output: {
      path: __dirname,
      filename: 'dist/bundle.css'
    },
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
  },
  {
    output: { path: __dirname, filename: 'dist' },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/index.html', to: 'dist/index.html' }
        ])
    ]


  }
]
