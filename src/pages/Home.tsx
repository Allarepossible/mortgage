import React from 'react';

import Page from 'pages/Page';
import MortgageBoard from 'containers/MortgageBoard';

const Home = () => {
    return (
        <Page title="Mortgage Board"  path="/">
            <MortgageBoard />
        </Page>
    );
};

export default {
    component: Home,
};
