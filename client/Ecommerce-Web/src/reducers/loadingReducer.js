import { createSlice } from '@reduxjs/toolkit'

const loading = createSlice({
    name: 'loading',
    initialState: {
        loadingCom: false
    },
    reducers: {
        loadingCom: (state) => {
            state.loadingCom = true
        },
        endLoadingCom: (state) => {
            state.loadingCom = false
        }
    }
})

export const { loadingCom, endLoadingCom } = loading.actions

const loadingReducer = loading.reducer

export default loadingReducer
