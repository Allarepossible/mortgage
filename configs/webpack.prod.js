const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PACKAGE = require('../package.json');
const version = PACKAGE.version;

const baseConfig = require('./webpack.common');

const config = {
    mode: 'production',
    entry: {
        index: ['@babel/polyfill', './src/client.tsx'],
        vendor: ['react', 'react-dom', 'react-hot-loader', 'react-router-dom', 'styled-components'],
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'app.[chunkhash].js',
        publicPath: '/',
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            BUILDINFO: {
                timestamp: JSON.stringify(new Date()),
                version: JSON.stringify(version),
            },
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            favicon: './src/assets/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyURLs: true,
            },
        }),
    ],
};

module.exports = () => {
    return merge(baseConfig, config);
};
