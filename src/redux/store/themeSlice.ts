import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: 'light' as 'light' | 'dark',
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            return action.payload
        },
        toggleTheme: (state) => {
            return state === 'light' ? 'dark' : 'light'
        }
    }
})

export const {setTheme, toggleTheme} = themeSlice.actions

export default themeSlice.reducer
