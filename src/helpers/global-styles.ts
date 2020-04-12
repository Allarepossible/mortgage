import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font: 14px 'Comfortaa', Arial, sans-serif;
        background: linear-gradient(0deg, #3b5e95, #3f82a4);
        margin: 0;
        padding: 0;
    }
    
    * {
        outline: none;
    }
`;

export default GlobalStyle;
