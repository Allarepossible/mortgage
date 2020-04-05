import styled from 'styled-components';

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
    
    & > a {
        margin-right: 40px;
        color: white;
        text-decoration: none;
    }
`;

export const Login = styled.button`
    font-size: 15px;
    color: white;
    background-color: transparent;
    border-radius: 5px;
    border: 2px solid white;
    padding: 8px 20px;
`;
