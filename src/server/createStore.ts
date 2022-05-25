import axios from 'axios';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension';

const axiosInstance = axios.create({
    baseURL: 'http://demo5795732.mockable.io',
});

export default () => createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
);
