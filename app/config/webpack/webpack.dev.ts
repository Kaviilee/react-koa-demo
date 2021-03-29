import { resolve, join } from 'path';
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import HappyPack from 'happypack'

const { ESBuildPlugin } = require('esbuild-loader')

import {
  createCSSRule
} from './createCssRule'

const DashboardPlugin = require('webpack-dashboard/plugin');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin()

const isLoal = process.env.ENV === 'local';

const frontendDir = resolve(__dirname, '..', '..');

interface Configuration extends WebpackConfiguration {
  devServer ? : WebpackDevServerConfiguration;
}

export const webpackConfig: Configuration = {
  stats: 'minimal', // webpack bundle information
  mode: 'development',
  entry: join(frontendDir, 'src', 'index.tsx'),
  output: {
    path: join(frontendDir, 'dist'),
    filename: `static/js/[name].[hash:8].js`,
    chunkFilename: `static/js/[name].[hash:8].js`,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '~': resolve(frontendDir, "src"),
      "@components": resolve(frontendDir, "src/components"),
      "@pages": resolve(frontendDir, "src/pages")
    },
    mainFields: ['jsnext:main', 'main'],
    modules: [resolve(__dirname, '../../node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'esnext'
        },
        include: resolve(__dirname, '../../src')
      },
      {
        test: /\.ts$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'esnext'
        }
      },
      createCSSRule(/\.css$/),
      createCSSRule(/\.less$/, 'less-loader'),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: ['happypack/loader?id=img'],
        include: resolve(__dirname, '../../src')
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    hot: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: `static/css/[name].[chunkhash:8].css`,
      chunkFilename: `static/css/[name].[chunkhash:8].css`,
    }),
    // 打包分析plugin
    // new BundleAnalyzerPlugin(),
    // gzip压缩
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    // 打包进度条显示
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60,
      total: 100
    }),
    new DashboardPlugin(),
    new HappyPack({
      id: 'img',
      loaders: [{
        loader: "url-loader",
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }]
    }),
    new ESBuildPlugin()
    // new UglifyJsPlugin({
    //     cache: true,
    //     parallel: true,
    // })
    // new ESBuildPlugin()
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 30,
          minChunks: 2
        }
      },
    },
  },
}

isLoal && Object.assign(webpackConfig.devServer, {
  // public: '/',
  port: 8081,
  proxy: {
    '/auth': {
      target: 'http://localhost:8080',
      changeOrigin: true
    },
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  },
})

export default smp.wrap(webpackConfig);
