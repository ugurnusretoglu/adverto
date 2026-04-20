import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface loadingState {
    loading: boolean
}

const initialState: loadingState = {
    loading: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state: loadingState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
})

export const { setLoading } = appSlice.actions

export default appSlice.reducer