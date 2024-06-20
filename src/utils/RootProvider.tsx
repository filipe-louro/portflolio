'use client'

import React from 'react'
import {Provider} from 'react-redux'
import StyledComponentsRegistry from '@/utils/StyledComponentsRegistry'
import ThemeProvider from '@/utils/ThemeProvider'
import store from '@/redux/store/store'

const RootProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <StyledComponentsRegistry>
            <Provider store={store}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </Provider>
        </StyledComponentsRegistry>
    )
}

export default RootProvider
