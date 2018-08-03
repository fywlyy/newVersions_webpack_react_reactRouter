const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'main': './src/main.jsx',
    'jquery': path.resolve(__dirname, './src/asset/plugins/jquery.min.js'),
    '3deye': path.resolve(__dirname, './src/asset/plugins/3deye.min.js'),
    'vendors':['react','react-dom','react-router-dom']
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
    ),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        filename: '../built/index.html', //生成的html存放路径，相对于path
        template: './src/index.html', //html模板路径
        inject: true, //js插入的位置，true/'head'/'body'/false
        hash: true, //为静态资源生成hash值
        chunks: ['manifest', 'jquery', '3deye', 'vendors', 'main'],
        chunksSortMode: function (chunk1, chunk2) {
          var order = ['manifest', 'jquery', '3deye', 'vendors', 'main'];
          var order1 = order.indexOf(chunk1.names[0]);
          var order2 = order.indexOf(chunk2.names[0]);
          return order1 - order2;
        },
        minify: { //压缩HTML文件
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: false //删除空白符与换行符
        }
    })
  ]
};