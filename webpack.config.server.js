const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = (_, { mode }) => {
    // mode : production and development are for the release
    // mode : none is for local development
    const isProd = mode === 'production' || mode === 'development';
    return {
        target: 'node',
        entry: path.resolve(__dirname, 'index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx'],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: './tsconfig.json',
                }),
            ],
        },
        // don't compile node_modules
        externals: [nodeExternals()],
        optimization: {
            moduleIds: 'deterministic',
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
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                // use the tsconfig in the server directory
                                configFile: './tsconfig.json',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin(
                !isProd
                    ? {
                          'process.env': JSON.stringify(dotenv.config().parsed),
                      }
                    : {}
            ),
        ],
        devtool: isProd ? false : 'inline-source-map',
    };
};
