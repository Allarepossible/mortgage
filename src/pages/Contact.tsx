import React from 'react';
import {connect} from 'react-redux';

import {fetchInfo} from 'actions/info';
import {State} from 'entities/info';
import {ContactId} from 'entities/contact';
import Page from 'pages/Page';

interface Props {
    title: string;
    contactId: ContactId;
}

const Contact = ({title, contactId}: Props) => {
    return (
        <Page title={title}>
            {contactId}
        </Page>
    );
};

export const mapStateToProps = ({info}: State) => {
    const {name, contactId} = info.data || {};

    return {title: name, contactId};
};

export default {
    loadData: ({dispatch}) => dispatch(fetchInfo()),
    component: connect(mapStateToProps)(Contact),
};
