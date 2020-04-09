export const CHANGE_DEPOSIT_PERCENT = 'CHANGE_DEPOSIT_PERCENT';
export const CHANGE_DEPOSIT_INITIAL_FEE = 'CHANGE_DEPOSIT_INITIAL_FEE';
export const ADD_DEPOSIT_FEE = 'ADD_DEPOSIT_FEE';
export const CHANGE_DEPOSIT_MONTHS = 'CHANGE_DEPOSIT_MONTHS';
export const CHANGE_DEPOSIT_START_DATE = 'CHANGE_DEPOSIT_START_DATE';

export interface Target {
    target: {
        value: string;
    };
}

export const changePercent = ({target}: Target) => async dispatch => {
    dispatch({
        type: CHANGE_DEPOSIT_PERCENT,
        payload: target.value,
    });
};

export const changeInitialFee = ({target}: Target) => async dispatch => {
    dispatch({
        type: CHANGE_DEPOSIT_INITIAL_FEE,
        payload: target.value,
    });
};

export const addDeposit = ({target}: Target) => async dispatch => {
    dispatch({
        type: ADD_DEPOSIT_FEE,
        payload: target.value,
    });
};

export const changeMonths = ({target}: Target) => async dispatch => {
    dispatch({
        type: CHANGE_DEPOSIT_MONTHS,
        payload: target,
    });
};

export const changeDate = ({target}: Target) => async dispatch => {
    dispatch({
        type: CHANGE_DEPOSIT_START_DATE,
        payload: target.value,
    });
};
