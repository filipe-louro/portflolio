import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({theme}) => theme.background};
        color: ${({theme}) => theme.text};
        transition: all 0.50s linear;
    }

    html,
    body {
        height: 100%;
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
`
