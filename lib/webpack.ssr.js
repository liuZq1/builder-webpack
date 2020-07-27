const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin'); // 基础包的分离（react，react-dom）
const cssnano = require('cssnano');
const baseConfg = require('./webpack.base');

const ssrConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
    ],
  },
  plugins: [
    // css代码压缩
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // 提取公共资源包
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  // 提取页面公共资源
  optimization: {
    splitChunks: {
      minSize: 0, // 抽离的公共包最小的大小，单位字节
      cacheGroups: { // 当打包同步代码时,上面的参数生效
        commons: {
          name: 'commons', // 让cacheGroups里设置的名字有效
          chunks: 'all', // 所有引入的库进行分离
          minChunks: 2, // 资源使用的次数(在多个页面使用到)， 大于1， 最小使用次数
        },
      },
    },
  },
};


module.exports = merge(ssrConfig, baseConfg);
