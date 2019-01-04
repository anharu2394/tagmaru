import * as path from 'path';
import { Configuration } from 'webpack';
import SitemapPlugin from 'sitemap-webpack-plugin';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin')

const root = [''];
const tagPaths = Array(499).fill(0).map((n, i) => '/tags/' + (i + 1).toString());
const paths = root.concat(tagPaths);

const config: Configuration = {
  context: path.join(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {loader: 'css-loader'},
        ],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
		  inlineSource: '.(js|css)$'
	  }),
    new HtmlWebpackInlineSourcePlugin(),
    new SitemapPlugin('https://tagmaru.me', paths, {
      fileName: 'sitemap.xml',
      lastMod: true,
      changeFreq: 'daily',
      priority: '0.4'
    }),
    new CopyWebpackPlugin([{
      from: './assets/images',
        to: 'assets/images'
    }]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    historyApiFallback: true,
  },
};

export default config;
