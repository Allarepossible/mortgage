const path = require('path');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

const baseConfig = require('./webpack.common');

const config =  {
    name: 'client',
    mode: 'development',
    entry: {
        index: [
            'react-hot-loader/patch',
            '@babel/runtime/regenerator',
            'webpack-hot-middleware/client?reload=true',
            './src/client.tsx',
        ],
        vendor: [
            'react-dom',
            'react-router-dom',
            'react-router-config',
            'redux',
            'react-helmet',
            'react-redux',
        ],
        app: [
            'react',
        ],
    },
    output: {
        filename: '[name]-bundle.[hash].js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                WEBPACK: true,
            },
        }),
    ],
    devtool: 'source-map',
};

module.exports = merge(baseConfig, config);
