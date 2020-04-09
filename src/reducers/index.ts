import {combineReducers} from 'redux';

import current from './current';
import info from './info';
import contact from './contact';
import deposit from './deposit';

export default combineReducers({
    current: current,
    info: info,
    deposit: deposit,
    contact: contact,
});
