'use client'

import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {darkTheme, lightTheme} from '@/styles/themes'
import {GlobalStyles} from '@/styles/global-styles'
import {RootState} from '@/redux/store/store'
import {setTheme} from '@/redux/store/themeSlice'
import Cookies from 'js-cookie'

const ThemeProvider = ({children}: { children: React.ReactNode }) => {
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
            <button onClick={() => setThemeAndCookie(theme === 'light' ? 'dark' : 'light')}>
                Toggle theme
            </button>
            {children}
        </StyledThemeProvider>
    )
}

export default ThemeProvider
