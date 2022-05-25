import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
`;

export const Menu = styled.div`
    display: flex;
    font-size: 15px;
    font-weight: 600;
`;

export const Login = styled.button`
    font-size: 15px;
    color: white;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5px;
    border: 2px solid white;
    padding: 8px 20px;
    
    &:hover, &:active {
        background-color: white;
        color: #3f82a4;
    }
`;

export const StyledLink = styled(Link)<{active: number}>`
    margin-right: 40px;
    ${({active}) => active === 1 ? 'color: #000;' : 'color: #fff;'}
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }

`;
