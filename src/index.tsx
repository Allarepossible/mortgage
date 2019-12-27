import * as React from 'react'
import {render} from 'react-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import Root from './Root';
import reducers from './reducers';

const store = createStore(
    reducers,
    (window as any).INITIAL_STATE,
    composeWithDevTools(applyMiddleware(thunk))
);

render(
    <Root store={store} />,
    document.getElementById('root'),
);

serviceWorker.unregister();
