import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({theme}) => theme.background};
        color: ${({theme}) => theme.text};
        transition: all 0.5s linear;
    }

    html,
    body {
        height: 100%;
        font-size: 100%;
        max-width: 100vw;
        overflow-x: hidden;
    }

    * {
        padding: 0;
        margin: 0;
    }

    a {
        text-decoration: none;
    }

    h1 {
        font-size: 5.652rem; /* 90.4px */
    }

    h2 {
        font-size: 3.997rem; /* 64px */
    }

    h3 {
        font-size: 2.827rem; /* 45.28px */
    }

    h4 {
        font-size: 1.999rem; /* 32px */
    }

    h5 {
        font-size: 1.414rem; /* 22.56px */
    }

    small {
        font-size: 0.707rem; /* 11.36px */
    }
`
