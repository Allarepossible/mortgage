import React from 'react';

import Page from 'pages/Page';
import MortgageWithPayments from 'containers/MortgageWithPayments';

const Mortgage = () => {
    return (
        <Page title="Mortgage with additional payments"  path="/mortgage">
            <MortgageWithPayments />
        </Page>
    );
};

export default {
    component: Mortgage,
};
