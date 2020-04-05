import {combineReducers} from 'redux';

import current from './current';
import info from './info';
import contact from './contact';

export default combineReducers({
    current: current,
    info: info,
    contact: contact,
});
