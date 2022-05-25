import {ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {normalize} from 'normalizr';

import {ApiType, createAction} from 'actions';
import {ContactCollection, ContactId} from 'entities/contact';
import {contactSchema} from 'entities/contact/schema';

export const FETCH_CONTACT: 'FETCH_CONTACT' = 'FETCH_CONTACT';
export const FETCH_CONTACT_SUCCESS: 'FETCH_CONTACT_SUCCESS' = 'FETCH_CONTACT_SUCCESS';
export const FETCH_CONTACT_FAILURE: 'FETCH_CONTACT_FAILURE' = 'FETCH_CONTACT_FAILURE';

export interface ContactState {
    data: ContactCollection;
    isLoading: boolean;
    error: string | null;
}

export const fetchContactAction = () =>
    createAction(FETCH_CONTACT);
export const fetchContactSuccessAction = (payload?: ContactCollection) =>
    createAction(FETCH_CONTACT_SUCCESS, payload);
export const fetchContactFailureAction = (payload: string) =>
    createAction(FETCH_CONTACT_FAILURE, payload);

export type ContactActions =
    | ReturnType<typeof fetchContactAction>
    | ReturnType<typeof fetchContactSuccessAction>
    | ReturnType<typeof fetchContactFailureAction>;


export const fetchContact: ActionCreator<ThunkAction<
    Promise<void>,
    ContactCollection,
    ApiType<ContactCollection>,
    ContactActions
>> = (id: ContactId) =>
    async (dispatch, _, api) => {
        dispatch(fetchContactAction());

        try {
            const {data} = await api.get(`contact/${id}`);
            const {entities} = normalize(data, contactSchema);

            dispatch(fetchContactSuccessAction(entities.contact));
        } catch (ex) {
            dispatch(fetchContactFailureAction(ex));
        }
    };
