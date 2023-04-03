const path = require('path');
const webpack = require('webpack');
const slsw = require('serverless-webpack');

module.exports = {
  target: 'node',
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  node: false,
  optimization: {
    minimize: false,
  },
  devtool: 'inline-cheap-module-source-map',
  resolve: {
    alias: {
      '@nestjs/websockets/socket-module': path.resolve(
        __dirname,
        'node_modules/@nestjs/websockets/socket-module',
      ),
    },
  },
};
