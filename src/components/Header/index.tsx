import React from 'react';
import {Link} from 'react-router-dom';

import {Wrap, Menu, Login} from  './styles';

const Header = () => (
    <Wrap>
        <Menu>
            <Link to="/stats">Статистика</Link>
            <Link to="/mortgage">Калькулятор ипотеки</Link>
            <Link to="/mortgage">Калькулятор досрочного погашения</Link>
        </Menu>
        <Login>Login</Login>
    </Wrap>
);

export default Header;
