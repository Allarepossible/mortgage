import React from 'react';
import {Link} from 'react-router-dom';

import {Wrap, Menu, Login} from  './styles';

const Header = () => (
    <Wrap>
        <Menu>
            {/*<Link to="/">Статистика</Link>*/}
            <Link to="/">Калькулятор ипотеки</Link>
            <Link to="/deposit">Вклад</Link>
            {/*<Link to="/mortgage">Калькулятор досрочного погашения</Link>*/}
        </Menu>
        <Login>Login</Login>
    </Wrap>
);

export default Header;
