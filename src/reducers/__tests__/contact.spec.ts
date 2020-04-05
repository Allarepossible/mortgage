import {Contact, ContactId} from 'entities/contact';
import {
    FETCH_CONTACT,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_FAILURE,
} from 'actions/contact';

import contactReducer, {initialState} from '../contact';

const CONTACT_ID: ContactId = 1;
const contact: Contact = {
    id: CONTACT_ID,
    name: 'Anna',
    phone: '+7 (495) 721-99-00',
};

describe('contact reducer', () => {
    it('FETCH_CONTACT', () => {
        const action = {
            type: FETCH_CONTACT,
        };

        expect(contactReducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('FETCH_CONTACT_SUCCESS', () => {
        const action = {
            type: FETCH_CONTACT_SUCCESS,
            payload: {
                [CONTACT_ID]: contact,
            },
        };

        expect(contactReducer(initialState, action)).toEqual({
            ...initialState,
            data: {...action.payload},
            isLoading: false,
        });
    });

    it('FETCH_CONTACT_FAILURE', () => {
        const action = {
            type: FETCH_CONTACT_FAILURE,
            payload: 'error',
        };

        expect(contactReducer(initialState, action)).toEqual({
            ...initialState,
            error: action.payload,
            isLoading: false,
        });
    });
});
