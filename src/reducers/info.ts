import {Reducer} from 'redux';
import {InitialState} from 'entities/info';
import {
    InfoActions,
    FETCH_INFO,
    FETCH_INFO_SUCCESS,
    FETCH_INFO_FAILURE,
} from 'actions/info';

export const initialState: InitialState = {
    data: {},
    error: null,
    isLoading: false,
};

const infoReducer: Reducer<InitialState | undefined, InfoActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case FETCH_INFO:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_INFO_SUCCESS:
            return {
                data: {...action.payload},
                isLoading: false,
                error: null,
            };
        case FETCH_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
    }
    return state;
};

export default infoReducer;
