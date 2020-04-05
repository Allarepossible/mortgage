import React from 'react';
import ReactDOM from 'react-dom';
import {renderRoutes} from 'react-router-config';
import {HashRouter as Router} from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import axios from 'axios';
import thunk from 'redux-thunk';

import theme from './theme';
import reducers from './reducers';
import Routes from './Routes';

import './assets/favicon.ico';

const axiosInstance = axios.create({
    baseURL: '/api',
});

declare global {
    interface Window { INITIAL_STATE: any }
}

const store = createStore(
    reducers,
    {...window.INITIAL_STATE},
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
                <div>{renderRoutes(Routes)}</div>
            </Router>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);
