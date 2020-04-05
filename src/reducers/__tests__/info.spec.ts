import {Info} from 'entities/info';
import {
    FETCH_INFO,
    FETCH_INFO_SUCCESS,
    FETCH_INFO_FAILURE,
} from 'actions/info';

import infoReducer, {initialState} from '../info';

const info: Info = {
    name: 'MEDSI',
    contactId: 1,
};

describe('info reducer', () => {
    it('FETCH_INFO', () => {
        const action = {
            type: FETCH_INFO,
        };

        expect(infoReducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('FETCH_INFO_SUCCESS', () => {
        const action = {
            type: FETCH_INFO_SUCCESS,
            payload: info,
        };

        expect(infoReducer(initialState, action)).toEqual({
            ...initialState,
            data: {...action.payload},
            isLoading: false,
        });
    });

    it('FETCH_INFO_FAILURE', () => {
        const action = {
            type: FETCH_INFO_FAILURE,
            payload: 'error',
        };

        expect(infoReducer(initialState, action)).toEqual({
            ...initialState,
            error: action.payload,
            isLoading: false,
        });
    });
});
