import * as path from 'path';
import { Configuration } from 'webpack';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const config: Configuration = {
  context: path.join(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.html$/,
        use: "html-loader"
      }
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
    new HtmlWebpackInlineSourcePlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: '0.0.0.0',
  },
};

export default config;
