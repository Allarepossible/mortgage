import {combineReducers} from 'redux';

import current from './current';
import info from './info';
import contact from './contact';
import deposit from './deposit';
import mortgage from './mortgage';

export default combineReducers({
    current: current,
    mortgage: mortgage,
    info: info,
    deposit: deposit,
    contact: contact,
});
