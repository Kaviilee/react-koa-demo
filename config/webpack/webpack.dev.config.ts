import { resolve, join } from 'path';
import { Configuration  } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {}
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        inline: true,
        hot: true,
        port: 8081,
        proxy: {
            '/auth': {
                target: 'http://localhost:8889',
                changeOrigin: true
            },
            '/api': {
                target: 'http://localhost:8889',
                changeOrigin: true
            }
        },
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new MiniCssExtractPlugin({
            filename: `static/css/[name].[chunkhash:8].css`,
            chunkFilename: `static/css/[name].[chunkhash:8].css`,
        }),
    ],
}
