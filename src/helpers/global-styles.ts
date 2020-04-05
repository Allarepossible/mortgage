import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    button {
        border: 0;
    }
    body {
        font: 14px 'OpenSansRegular', Arial, sans-serif;
        margin: 0;
        padding: 0;
    }
    @font-face {
        font-family: 'OpenSansRegular';
    
        src: url('/font/OpenSansRegular.eot');
        url('/font/OpenSansRegular.ttf') format('truetype');
    }
    @font-face {
        font-family: 'OpenSansLight';
    
        src: url('/font/OpenSansLight.eot');
        url('/font/OpenSansLight.ttf') format('truetype');
    }
    @font-face {
        font-family: 'OpenSansBold';
    
        src: url('/font/OpenSansBold.eot');
        url('/font/OpenSansBold.ttf') format('truetype');
    }
    @font-face {
        font-family: 'OpenSansSemiBold';
    
        src: url('/font/OpenSansSemiBold.eot');
        url('/font/OpenSansSemiBold.ttf') format('truetype');
    }
`;

export default GlobalStyle;
