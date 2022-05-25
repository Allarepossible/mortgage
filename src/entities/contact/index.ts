export type ContactId = number;

export interface Contact {
    id: ContactId;
    name: string;
    phone: string;
}

export interface ContactCollection {
    [key: number]: Contact;
}

export interface State {
    contact: {
        data: ContactCollection;
        error?: string | null;
        isLoading?: boolean;
    };
}
