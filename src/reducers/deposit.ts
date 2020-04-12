import {
    ADD_CONTRIBUTION,
    REMOVE_CONTRIBUTION,
    CHANGE_DEPOSIT_INITIAL_FEE,
    CHANGE_DEPOSIT_MONTHS,
    CHANGE_DEPOSIT_PERCENT,
    CHANGE_DEPOSIT_START_DATE,
} from 'actions/deposit';

import {calculateTransactions} from 'helpers/days';

const initialState = {
    percent: 6,
    initialFee: 400000,
    months: 9,
    transactions: calculateTransactions({
        percent: 6,
        months: 9,
        deposit: 400000,
        contributions: [],
        startDate: '2019-12-01',
    }),
    contributions: [],
    nextId: 0,
    startDate: '2019-12-01',
};

const priceToNumber = price => price.replace(/[^\d]/g, '');

const currentReducer = (state = initialState, {type, payload}) => {
    const {percent, months, initialFee, contributions, startDate} = state;
    switch (type) {
        case REMOVE_CONTRIBUTION:
            return {
                ...state,
                contributions: contributions.filter(({id}) => id !== payload),
                transactions: calculateTransactions({
                    percent,
                    months,
                    deposit: initialFee,
                    contributions: contributions.filter(({id}) => id !== payload),
                    startDate,
                }),
            };
        case ADD_CONTRIBUTION:
            const newContributions = [...state.contributions, payload];

            return {
                ...state,
                nextId: state.nextId + 1,
                contributions: newContributions,
                transactions: calculateTransactions({
                    percent,
                    months,
                    deposit:
                    initialFee,
                    contributions: newContributions,
                    startDate,
                }),
            };
        case CHANGE_DEPOSIT_PERCENT:
            return {
                ...state,
                percent: payload,
                transactions: calculateTransactions({
                    percent: payload,
                    months,
                    deposit: initialFee,
                    contributions,
                    startDate,
                }),
            };
        case CHANGE_DEPOSIT_INITIAL_FEE:
            return {
                ...state,
                initialFee: priceToNumber(payload),
                transactions: calculateTransactions({percent, months, deposit: payload, contributions, startDate}),
            };
        case CHANGE_DEPOSIT_MONTHS:
            return {
                ...state,
                months: payload,
                transactions: calculateTransactions({
                    percent,
                    months: payload,
                    deposit: initialFee,
                    contributions,
                    startDate,
                }),
            };
        case CHANGE_DEPOSIT_START_DATE:
            return {
                ...state,
                startDate: payload,
                transactions: calculateTransactions({
                    percent,
                    months,
                    deposit: initialFee,
                    contributions,
                    startDate: payload,
                }),
            };
        default:
            return state;
    }
};

export default currentReducer;
