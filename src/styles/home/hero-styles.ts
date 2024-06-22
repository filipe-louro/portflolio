import styled from 'styled-components'

export const HeroContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #FFFFFF;
    padding: 0 20px;
    position: absolute;
    z-index: 1;
`

export const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 1rem;
    font-family: var(--font-bruno-ace);
`

export const Subtitle = styled.p`
    font-size: 1.5rem;
    margin-bottom: 2rem;
`

export const Button = styled.button`
    background-color: ${({theme}) => theme.primary};
    color: #fff;
    padding: 0.75rem 2rem;
    border-radius: 5px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border: none;

    &:hover {
        background-color: ${({theme}) => theme.primary700};
    }
`