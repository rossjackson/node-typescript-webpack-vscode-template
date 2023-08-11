import dotenv from 'dotenv'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'

const config = (_: any, { mode }: any): webpack.Configuration => {
    const isProd = !!mode
    return {
        target: 'node',
        entry: path.resolve(__dirname, 'index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.js'],
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
    }
}

export default config
