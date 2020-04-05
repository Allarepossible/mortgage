import express from 'express';
import cookieParser from 'cookie-parser';
import proxy from 'express-http-proxy';
const server = express();
server.use(cookieParser());

import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import configDevClient from '../../configs/webpack.dev-client.js';
import configDevServer from '../../configs/webpack.dev-server.js';

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const PORT = process.env.PORT || 8080;

let isBuilt = false;

const done = () => {
    !isBuilt &&
    server.listen(PORT, () => {
        isBuilt = true;
        // eslint-disable-next-line no-console
        console.log(
            `Server listening on http://localhost:${PORT} 🌎...`
        );
    });
    server.use(
        '/api',
        proxy('http://demo5795732.mockable.io')
    );
};

if (isDev) {
    const compiler = webpack([configDevClient, configDevServer]);

    const clientCompiler = compiler.compilers[0];
    // const serverCompiler = compiler.compilers[1];

    const webpackDevMiddleware = require('webpack-dev-middleware')(
        compiler,
        configDevClient.devServer
    );

    const webpackHotMiddlware = require('webpack-hot-middleware')(
        clientCompiler,
        configDevClient.devServer
    );

    server.use(webpackDevMiddleware);
    server.use(webpackHotMiddlware);
    server.use(webpackHotServerMiddleware(compiler));
    done();
}
