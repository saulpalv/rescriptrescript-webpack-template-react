// @ts-check
/** @typedef { import('webpack').Configuration } Configuration*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

/** @returns { Configuration } */
module.exports = (env, argv) => {
    const mode = argv.mode
    const isDevelopment = mode === "development"
    return {
        target: 'web',
        mode: isDevelopment ? 'development' : 'production',
        entry: './src/index.tsx',
        devtool: 'inline-source-map',
        devServer: {
            hot: true,
            static: './dist',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
            }),
            new ForkTsCheckerWebpackPlugin(),
            isDevelopment && new ReactRefreshWebpackPlugin()

        ].filter(Boolean),
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: require.resolve('ts-loader'),
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ]
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                }
            ],
        }
    }
}