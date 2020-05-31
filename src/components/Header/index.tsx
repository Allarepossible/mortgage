import React from 'react';

import {Wrap, Menu, Login, StyledLink} from  './styles';

const LINKS = [
    {title: 'Калькулятор', path: '/'},
    {title: 'Вклад', path: '/deposit'},
    {title: 'Калькулятор досрочного погашения', path: '/mortgage'},
];

const Header = ({activePath}) => (
    <Wrap>
        <Menu>
            {
                LINKS.map(({title, path}, i) => (
                    <StyledLink active={path === activePath ? 1 : 0} to={path} key={i}>{title}</StyledLink>
                ))
            }
        </Menu>
        <Login>Login</Login>
    </Wrap>
);

export default Header;
