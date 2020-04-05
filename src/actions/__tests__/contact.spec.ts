import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import {Contact, ContactId} from 'entities/contact';
import {
    fetchContact,
    fetchContactAction,
    fetchContactSuccessAction,
    fetchContactFailureAction,
    FETCH_CONTACT,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_FAILURE,
} from '../contact';

const CONTACT_ID: ContactId = 1;
const API_ROOT = '/api/v1';
const ERROR_MESSAGE = 'Error with load contacts';
const contact: Contact = {
    id: CONTACT_ID,
    name: 'Anna',
    phone: '+7 (999) 999-99-99',
};
const middlewares = [thunk.withExtraArgument({
    get: jest.fn(() => Promise.resolve({data: contact})),
})];

const mockStore = configureMockStore(middlewares);

describe('Contact', () => {
    it('action fetchContactAction() should create action to set isLoading', () => {
        const action = {
            type: FETCH_CONTACT,
        };

        expect(fetchContactAction()).toEqual(action);
    });

    it('action fetchContactSuccessAction() should attach new data', () => {
        const payload = {
            [CONTACT_ID]: contact,
        };
        const action = {
            type: FETCH_CONTACT_SUCCESS,
            payload,
        };

        expect(fetchContactSuccessAction(payload)).toEqual(action);
    });

    it('action fetchContactFailureAction() should add error message', () => {
        const action = {
            type: FETCH_CONTACT_FAILURE,
            payload: ERROR_MESSAGE,
        };

        expect(fetchContactFailureAction(ERROR_MESSAGE)).toEqual(action);
    });

    describe('async action fetchContact', () => {
        afterEach(() => {
            fetchMock.reset();
            fetchMock.restore();
        });

        it('creates FETCH_CONTACT_SUCCESS when fetching contact has been done', async () => {
            fetchMock.get(`${API_ROOT}contacts/${CONTACT_ID}`, {
                headers: {'content-type': 'application/json'},
                body: {
                    data: contact,
                    status: 'ok',
                },
            });
            const payload = {
                [CONTACT_ID]: contact,
            };

            const expectedActions = [{
                type: FETCH_CONTACT,
            }, {
                type: FETCH_CONTACT_SUCCESS,
                payload,
            }];

            const store = mockStore({});

            await store.dispatch(fetchContact(CONTACT_ID));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
