import { resolve, join } from 'path';
import { Configuration  } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CompressionWebpackPlugin from 'compression-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

const frontendDir = resolve(__dirname, '..', '..')

export const webpackConfig: Configuration = {
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
            "@routes": resolve(frontendDir, "src/routes")
        }
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: { hmr: true },
                    },
                    'css-modules-typescript-loader',
                    {
                      loader: 'css-loader',
                      options: {
                        modules: false,
                        // modules: {
                        //   mode: 'local',
                        //   context: resolve(frontendDir, 'src'),
                        //   localIdentName: '[path][name]__[local]',
                        // },
                        localsConvention: 'camelCaseOnly',
                        importLoaders: 0,
                        sourceMap: true,
                      },
                    },
                ],
            },
            {
                test: /\.less$/,
                loader: 'less-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        inline: true,
        hot: true,
        // public: '/',
        // proxy: {
        //     '/auth': {
        //         target: 'http://localhost:8080',
        //         changeOrigin: true
        //     },
        //     '/api': {
        //         target: 'http://localhost:8080',
        //         changeOrigin: true
        //     }
        // },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new MiniCssExtractPlugin({
            filename: `static/css/[name].[chunkhash:8].css`,
            chunkFilename: `static/css/[name].[chunkhash:8].css`,
        }),
        // 打包分析plugin
        new BundleAnalyzerPlugin(),
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
        })
    ],
    optimization: {
        splitChunks: { // 提取公共代码
            chunks: 'async',
            minSize: 30000,
            // minRemainingSize: 0,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
}
