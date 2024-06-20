'use client'

import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled, {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {motion} from 'framer-motion'
import {MdModeNight, MdWbSunny} from 'react-icons/md'
import {darkTheme, lightTheme} from '@/styles/themes'
import {GlobalStyles} from '@/styles/global-styles'
import {darken} from 'polished'
import {RootState} from '@/redux/store/store'
import {setTheme} from '@/redux/store/themeSlice'
import Cookies from 'js-cookie'

const ThemeSwitch = ({children}: { children: React.ReactNode }) => {
    const theme = useSelector((state: RootState) => state.theme)
    const dispatch = useDispatch()

    useEffect(() => {
        const savedTheme = Cookies.get('theme') as 'light' | 'dark'
        if (savedTheme) {
            dispatch(setTheme(savedTheme))
        }
    }, [dispatch])

    const setThemeAndCookie = (themeValue: 'light' | 'dark') => {
        Cookies.set('theme', themeValue)
        dispatch(setTheme(themeValue))
    }

    return (
        <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles/>
            <SwitchContainer>
                <SwitchCheckbox
                    id="themeSwitch"
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={() => setThemeAndCookie(theme === 'light' ? 'dark' : 'light')}
                />
                <SwitchSlider htmlFor="themeSwitch" className="slider">
                    <SwitchIconWrapper
                        theme={theme === 'light' ? lightTheme : darkTheme}
                        checked={theme === 'dark'}
                        initial={{x: 0}}
                        animate={{x: theme === 'dark' ? 24 : 0}}
                        transition={{duration: 0.3}}
                    >
                        {theme === 'light' ? <MdModeNight size={24}/> : <MdWbSunny size={24}/>}
                    </SwitchIconWrapper>
                </SwitchSlider>
            </SwitchContainer>
            {children}
        </StyledThemeProvider>
    )
}

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`

const SwitchCheckbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`

const SwitchSlider = styled.label`
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
            background-color: ${(props) => darken(0.1, props.theme.secondary)};
        }
    }

    ${SwitchCheckbox}:checked + &::before {
        transform: translateX(calc(100% - 23px));
    }
`

const SwitchIconWrapper = styled(motion.div)<{ theme: typeof lightTheme | typeof darkTheme; checked: boolean }>`
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

export default ThemeSwitch
