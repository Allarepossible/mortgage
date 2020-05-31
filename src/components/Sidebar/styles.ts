import styled from 'styled-components';

export const Wrap = styled.div`
    position: fixed;
    padding: 15px;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100vh;
`;

export const Menu = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    
    & > div {
        margin-bottom: 45px;
    }
`;

export const Logo = styled.div`
    margin-bottom: 40px;
`;

export const Settings = styled.div`
    position: absolute;
    bottom: 20px;
    left: 35px;
`;
