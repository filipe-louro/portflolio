import styled from 'styled-components'
import {motion} from 'framer-motion'
import {darkTheme, lightTheme} from '@/styles/themes'
import {darken, lighten} from 'polished'

export const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    position: absolute;
`

export const SwitchCheckbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`

export const SwitchSlider = styled.label`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
    background-color: ${(props) => props.theme.secondary};
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${(props) => darken(0.3, props.theme.secondary)};
    }

    ${SwitchCheckbox}:checked + & {
        background-color: ${(props) => props.theme.secondary};

        &:hover {
            background-color: ${(props) => lighten(0.3, props.theme.secondary)};
        }
    }

    ${SwitchCheckbox}:checked + &::before {
        transform: translateX(calc(100% - 23px));
    }
`

export const SwitchIconWrapper = styled(motion.div)<{ theme: typeof lightTheme | typeof darkTheme; checked: boolean }>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    border-radius: 50%;
`