import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import {Info} from 'entities/info';

import {
    fetchInfo,
    fetchInfoAction,
    fetcInfoSuccessAction,
    fetchInfoFailureAction,
    FETCH_INFO,
    FETCH_INFO_SUCCESS,
    FETCH_INFO_FAILURE,
} from '../info';

const info: Info = {
    name: 'Hello',
    contactId: 1,
};
const API_ROOT = '/api/v1';
const ERROR_MESSAGE = 'Error with load info';

const middlewares = [thunk.withExtraArgument({
    get: jest.fn(() => Promise.resolve({data: info})),
})];

const mockStore = configureMockStore(middlewares);

describe('Info', () => {
    it('action fetchInfoAction() should create action to set isLoading', () => {
        const action = {
            type: FETCH_INFO,
        };

        expect(fetchInfoAction()).toEqual(action);
    });

    it('action fetcInfoSuccessAction() should attach new data', () => {
        const payload = info;
        const action = {
            type: FETCH_INFO_SUCCESS,
            payload,
        };

        expect(fetcInfoSuccessAction(payload)).toEqual(action);
    });

    it('action fetchInfoFailureAction() should add error message', () => {
        const action = {
            type: FETCH_INFO_FAILURE,
            payload: ERROR_MESSAGE,
        };

        expect(fetchInfoFailureAction(ERROR_MESSAGE)).toEqual(action);
    });

    describe('async action fetchInfo', () => {
        afterEach(() => {
            fetchMock.reset();
            fetchMock.restore();
        });

        it('creates FETCH_INFO_SUCCESS when fetching contact has been done', async () => {
            fetchMock.get(`${API_ROOT}info`, {
                headers: {'content-type': 'application/json'},
                body: {
                    data: info,
                    status: 'ok',
                },
            });
            const payload = info;

            const expectedActions = [{
                type: FETCH_INFO,
            }, {
                type: FETCH_INFO_SUCCESS,
                payload,
            }];

            const store = mockStore({});

            await store.dispatch(fetchInfo());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
