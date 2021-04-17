const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    index: './src/index.jsx',
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './build',
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
        resolve: {
          extensions: ['*', '.js', '.jsx'],
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[content-hash].[ext]',
              lazy: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
    ],
  },
};
