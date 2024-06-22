import {darkTheme, lightTheme} from '@/styles/themes'
import {MdModeNight, MdWbSunny} from 'react-icons/md'
import * as SwitchThemeButtonStyles from '@/styles/theme/switch-theme-styles'
import React from 'react'
import Cookies from 'js-cookie'
import {setTheme} from '@/redux/store/themeSlice'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '@/redux/store/store'

const SwitchThemeButton = () => {
    const theme = useSelector((state: RootState) => state.theme)
    const dispatch = useDispatch()

    const setThemeAndCookie = (themeValue: 'light' | 'dark') => {
        Cookies.set('theme', themeValue)
        dispatch(setTheme(themeValue))
    }

    return (
        <SwitchThemeButtonStyles.SwitchContainer>
            <SwitchThemeButtonStyles.SwitchCheckbox
                id="themeSwitch"
                type="checkbox"
                checked={theme === 'dark'}
                onChange={() => setThemeAndCookie(theme === 'light' ? 'dark' : 'light')}
            />
            <SwitchThemeButtonStyles.SwitchSlider htmlFor="themeSwitch" className="slider">
                <SwitchThemeButtonStyles.SwitchIconWrapper
                    theme={theme === 'light' ? lightTheme : darkTheme}
                    checked={theme === 'dark'}
                    initial={{x: 0}}
                    animate={{x: theme === 'dark' ? 24 : 0}}
                    transition={{duration: 0.3}}
                >
                    {theme === 'light' ? <MdModeNight size={24}/> : <MdWbSunny size={24}/>}
                </SwitchThemeButtonStyles.SwitchIconWrapper>
            </SwitchThemeButtonStyles.SwitchSlider>
        </SwitchThemeButtonStyles.SwitchContainer>
    )
}

export default SwitchThemeButton