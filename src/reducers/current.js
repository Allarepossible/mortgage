const initialState = {
    fullPrice: 6000000,
    percent: 9.9,
    initialFee: 2500000,
    years: 15,
};

import {
    CHANGE_FULL_PRICE,
    CHANGE_PERCENT,
    CHANGE_INITIAL_FEE,
    CHANGE_YEARS,
} from '../actions';

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case CHANGE_FULL_PRICE:
            return {
                ...state,
                fullPrice: payload,
            };
        case CHANGE_PERCENT:
            return {
                ...state,
                percent: payload,
            };
        case CHANGE_INITIAL_FEE:
            return {
                ...state,
                initialFee: payload,
            };
        case CHANGE_YEARS:
            return {
                ...state,
                years: payload,
            };
        default:
            return state;
    }
};
