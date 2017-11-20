const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    watchContentBase: true,
    contentBase: path.join(__dirname, 'dev'),
    proxy: {
      '/': 'http://localhost:8000'
    }
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.module.rules.push(
    {
      test: /\.styl$/,
      use: [
        'style-loader',
        {loader: 'css-loader', options: {importLoaders: 1, sourceMap: 1}},
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [require('autoprefixer')({
              browsers: ['last 3 versions']
            })]
          }
        },
        'stylus-loader'
      ]
    }
  );
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';

  let cleanOptions = {
    exclude: ['skins']
  };

  module.exports.module.rules.push(
    {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract([
        {loader: 'css-loader', options: {importLoaders: 1, sourceMap: 1}},
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [require('autoprefixer')({
              browsers: ['last 3 versions']
            })]
          }
        },
        'stylus-loader'
      ])
    }
  );

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin('styles.css'),
    new CleanWebpackPlugin(['dist'], cleanOptions)
  ]);
}
