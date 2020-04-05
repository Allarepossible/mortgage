import React from 'react';

import Page from 'pages/Page';
import App from 'containers/App';

const Home = () => {
    return (
        <Page title={'home Page'}>
            <App />
        </Page>
    );
};

export default {
    component: Home,
};
