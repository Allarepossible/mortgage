import {
    CHANGE_DEPOSIT_INITIAL_FEE,
    CHANGE_DEPOSIT_MONTHS,
    CHANGE_DEPOSIT_PERCENT,
    CHANGE_DEPOSIT_START_DATE,
} from 'actions/deposit';

const initialState = {
    percent: 6,
    initialFee: 400000,
    months: 12,
    startDate: '2019-12-01',
};

const priceToNumber = price => price.replace(/[^\d]/g, '');

const currentReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case CHANGE_DEPOSIT_PERCENT:
            return {
                ...state,
                percent: payload,
            };
        case CHANGE_DEPOSIT_INITIAL_FEE:
            return {
                ...state,
                initialFee: priceToNumber(payload),
            };
        case CHANGE_DEPOSIT_MONTHS:
            return {
                ...state,
                months: payload,
            };
        case CHANGE_DEPOSIT_START_DATE:
            return {
                ...state,
                startDate: payload,
            };
        default:
            return state;
    }
};

export default currentReducer;
