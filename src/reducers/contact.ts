import {Reducer} from 'redux';
import {
    ContactState,
    ContactActions,
    FETCH_CONTACT,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_FAILURE,
} from 'actions/contact';

export const initialState: ContactState = {
    data: {},
    error: null,
    isLoading: false,
};

const contactReducer: Reducer<ContactState | undefined, ContactActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case FETCH_CONTACT:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_CONTACT_SUCCESS:
            return {
                data: {...action.payload},
                isLoading: false,
                error: null,
            };
        case FETCH_CONTACT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
    }
    return state;
};

export default contactReducer;
