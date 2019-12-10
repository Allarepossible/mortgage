import {combineReducers} from 'redux';

import chartReducer from './chartReducer';

export default combineReducers({
    chart: chartReducer,
});
