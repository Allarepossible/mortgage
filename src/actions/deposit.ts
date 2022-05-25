import {ActionCreator} from 'redux';

import {createAction} from 'actions';

export const ADD_CONTRIBUTION: 'ADD_CONTRIBUTION' = 'ADD_CONTRIBUTION';
export const REMOVE_CONTRIBUTION: 'REMOVE_CONTRIBUTION' = 'REMOVE_CONTRIBUTION';
export const CHANGE_DEPOSIT_MONTHS: 'CHANGE_DEPOSIT_MONTHS' = 'CHANGE_DEPOSIT_MONTHS';
export const CHANGE_DEPOSIT_PERIOD: 'CHANGE_DEPOSIT_PERIOD' = 'CHANGE_DEPOSIT_PERIOD';
export const CHANGE_DEPOSIT_START_DATE: 'CHANGE_DEPOSIT_START_DATE' = 'CHANGE_DEPOSIT_START_DATE';
export const CHANGE_DEPOSIT_PERCENT: 'CHANGE_DEPOSIT_PERCENT' = 'CHANGE_DEPOSIT_PERCENT';
export const CHANGE_DEPOSIT_AMOUNT: 'CHANGE_DEPOSIT_AMOUNT' = 'CHANGE_DEPOSIT_AMOUNT';
export const RECALCULATE_TRANSACTIONS: 'RECALCULATE_TRANSACTIONS' = 'RECALCULATE_TRANSACTIONS';

export interface Target {
    target: {
        value: string;
    };
}

export const addContributionAction = (payload: any) => createAction(ADD_CONTRIBUTION, payload);
export const removeContributionAction = (payload: number) => createAction(REMOVE_CONTRIBUTION, payload);
export const changePercentAction = (payload: string) => createAction(CHANGE_DEPOSIT_PERCENT, payload);
export const changeDepositAmountAction = (payload: string) => createAction(CHANGE_DEPOSIT_AMOUNT, payload);
export const changePeriodAction = (payload: string) => createAction(CHANGE_DEPOSIT_PERIOD, payload);
export const changeStartDateAction = (payload: string) => createAction(CHANGE_DEPOSIT_START_DATE, payload);

export const recalculateTransactionsAction = () => createAction(RECALCULATE_TRANSACTIONS);


export type ContactActions =
    | ReturnType<typeof addContributionAction>
    | ReturnType<typeof removeContributionAction>
    | ReturnType<typeof changePercentAction>
    | ReturnType<typeof changePeriodAction>
    | ReturnType<typeof changeStartDateAction>
    | ReturnType<typeof recalculateTransactionsAction>
    | ReturnType<typeof changeDepositAmountAction>;


export const changePercent: ActionCreator<any> = ({target}: Target) => dispatch => {
    dispatch(changePercentAction(target.value));
    dispatch(recalculateTransactionsAction());
};

export const changeDeposit: ActionCreator<any> = ({target}: Target) => dispatch => {
    dispatch(changeDepositAmountAction(target.value));
    dispatch(recalculateTransactionsAction());
};

export const changePeriod: ActionCreator<any> = (value: string) => dispatch => {
    dispatch(changePeriodAction(value));
    dispatch(recalculateTransactionsAction());
};

export const changeStartDate: ActionCreator<any> = ({target}: Target) => dispatch => {
    dispatch(changeStartDateAction(target.value));
    dispatch(recalculateTransactionsAction());
};

export const addContribution: ActionCreator<any> = (value: any) => dispatch => {
    dispatch(addContributionAction(value));
    dispatch(recalculateTransactionsAction());
};

export const removeContribution: ActionCreator<any> = (value: number) => dispatch => {
    dispatch(removeContributionAction(value));
    dispatch(recalculateTransactionsAction());
};
