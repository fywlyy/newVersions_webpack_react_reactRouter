const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main.jsx',
    vendors:['react','react-dom','react-router-dom']
  },
  output: {
    path: path.resolve(__dirname, './built'),
    filename: 'js/[name].js?[chunkhash]',
    chunkFilename: 'js/[name].js?[chunkhash]'
  },
  resolve: {
    modules: [ 'node_modules' ],
    extensions: ['.js', '.jsx','.scss','.css']
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx|js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['env','react'],
            plugins: ['syntax-dynamic-import']
          }          
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader', 
            options: {
              sourceMap: true, 
              modules: true,
              localIdentName: '[local]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader', options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.png|jpg|gif|jpeg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'images/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
        options: {
            name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors','manifest'],
      minChunks: 2
    }),
    new CleanWebpackPlugin(
      ['built/*'],
      {
        root: __dirname,
        verbose:  true,
        dry:      false
      }
    )
  ]
};