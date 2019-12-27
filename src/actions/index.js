import { action } from 'typesafe-actions';

export const CHANGE_FULL_PRICE = 'CHANGE_FULL_PRICE';
export const CHANGE_PERCENT = 'CHANGE_PERCENT';
export const CHANGE_INITIAL_FEE = 'CHANGE_INITIAL_FEE';
export const CHANGE_YEARS = 'CHANGE_YEARS';

export const changeFullPrice = ({target})  => async dispatch => {
    dispatch({
        type: CHANGE_FULL_PRICE,
        payload: target.value,
    });
};

export const changePercent = ({target}) => async dispatch => {
    dispatch({
        type: CHANGE_PERCENT,
        payload: target.value,
    });
};
export const changeInitialFee = ({target}) => async dispatch => {
    dispatch({
        type: CHANGE_INITIAL_FEE,
        payload: target.value,
    });
};
export const changeYears = ({target}) => async dispatch => {
    dispatch({
        type: CHANGE_YEARS,
        payload: target.value,
    });
};
