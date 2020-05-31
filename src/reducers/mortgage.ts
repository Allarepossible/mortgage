import {
    ADD_CONTRIBUTION,
    REMOVE_CONTRIBUTION,
    RECALCULATE_TRANSACTIONS,
    CHANGE_DEPOSIT_AMOUNT,
    CHANGE_DEPOSIT_PERCENT,
    CHANGE_DEPOSIT_START_DATE,
    CHANGE_DEPOSIT_PERIOD,
} from 'actions/deposit';

import {calculatePayments} from 'helpers/mortgage';

const initialState = {
    fullPrice: 6000000,
    percent: 9.9,
    initialFee: 2500000,
    months: 180,
    payments: calculatePayments({
        fullPrice: 6000000,
        percent: 9.9,
        initialFee: 2500000,
        months: 180,
        contributions: [],
        startDate: '2019-12-01',
    }),
    contributions: [],
    nextId: 0,
    startDate: '2019-12-01',
};


const currentReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case REMOVE_CONTRIBUTION:
            return {
                ...state,
                contributions: state.contributions.filter(({id}) => id !== payload),
            };
        case ADD_CONTRIBUTION:
            const newContributions = [...state.contributions, payload];

            return {
                ...state,
                nextId: state.nextId + 1,
                contributions: newContributions,
            };
        case CHANGE_DEPOSIT_PERCENT:
            return {
                ...state,
                percent: payload,
            };
        case CHANGE_DEPOSIT_AMOUNT:
            return {
                ...state,
                deposit: Number(payload.replace(' ', '')),
            };
        case CHANGE_DEPOSIT_PERIOD:
            return {
                ...state,
                months: payload,
            };
        case CHANGE_DEPOSIT_START_DATE:
            return {
                ...state,
                startDate: payload,
            };
        case RECALCULATE_TRANSACTIONS:
            return {
                ...state,
                transactions: calculatePayments(state),
            };
        default:
            return state;
    }
};

export default currentReducer;
