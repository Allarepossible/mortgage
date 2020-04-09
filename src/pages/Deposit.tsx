import React from 'react';

import Page from 'pages/Page';
import DepositBoard from 'containers/DepositBoard';

const Home = () => {
    return (
        <Page title={'Deposit Board'}>
            <DepositBoard />
        </Page>
    );
};

export default {
    component: Home,
};
