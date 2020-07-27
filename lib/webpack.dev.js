const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfg = require('./webpack.base');

// dev阶段需要配置代码热更新和sourceMap
const devConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'error-only',
  },
  devtool: 'cheap-source-map',
};


module.exports = merge(devConfig, baseConfg);
