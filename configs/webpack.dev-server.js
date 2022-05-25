const path = require('path');
const merge = require('webpack-merge');
const externals = require('./node-externals');
const webpack = require('webpack');

const baseConfig = require('./webpack.common');

const config =  {
    name: 'server',
    target: 'node',
    externals,
    mode: 'development',
    entry: './src/server/render.tsx',
    output: {
        filename: 'dev-server-bundle.js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../build'),
        libraryTarget: 'commonjs2',
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ],
    devtool: 'source-map',
};

module.exports = merge(baseConfig, config);
