import React from 'react';
import {Link} from 'react-router-dom';

import Page from 'pages/Page';
import App from 'containers/App';

const Home = () => {
    return (
        <Page title={'home Page'}>
            Good morning!
            <Link to='/contact' >Контакты</Link>
            <App />
        </Page>
    );
};

export default {
    component: Home,
};
