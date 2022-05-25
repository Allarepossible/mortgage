import {ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {ApiType, createAction} from 'actions';
import {Info} from 'entities/info';

export const FETCH_INFO: 'FETCH_INFO' = 'FETCH_INFO';
export const FETCH_INFO_SUCCESS: 'FETCH_INFO_SUCCESS' = 'FETCH_INFO_SUCCESS';
export const FETCH_INFO_FAILURE: 'FETCH_INFO_FAILURE' = 'FETCH_INFO_FAILURE';

export const fetchInfoAction = () =>
    createAction(FETCH_INFO);
export const fetcInfoSuccessAction = (payload?: Info) =>
    createAction(FETCH_INFO_SUCCESS, payload);
export const fetchInfoFailureAction = (payload: string) =>
    createAction(FETCH_INFO_FAILURE, payload);

export type InfoActions =
    | ReturnType<typeof fetchInfoAction>
    | ReturnType<typeof fetcInfoSuccessAction>
    | ReturnType<typeof fetchInfoFailureAction>;

export const fetchInfo: ActionCreator<ThunkAction<
    Promise<void>,
    Info,
    ApiType<Info>,
    InfoActions
>> = () => async (dispatch, _, api) => {
    dispatch(fetchInfoAction());

    try {
        const {data} = await api.get('info');

        dispatch(fetcInfoSuccessAction(data));
    } catch (ex) {
        dispatch(fetchInfoFailureAction(ex));
    }
};
