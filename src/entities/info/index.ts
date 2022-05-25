import {ContactId} from 'entities/contact';

export interface Info {
    name: string;
    contactId: ContactId;
}

export interface InitialState {
    data: {};
    error?: string | null;
    isLoading?: boolean;
}

export interface InfoState {
    data: Info;
    error?: string | null;
    isLoading?: boolean;
}

export interface State {
    info: InfoState;
}
