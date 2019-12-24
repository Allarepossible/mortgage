import React from 'react';
import {render} from 'react-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import Root from './Root';
import reducers from './reducers'

const store = createStore(
    reducers,
    window.INITIAL_STATE,
    composeWithDevTools(applyMiddleware(thunk))
);

render(
    <Root store={store} />,
    document.getElementById('root'),
);
