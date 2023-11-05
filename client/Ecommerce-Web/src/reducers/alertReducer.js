import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState: {
        notifyEventCom: {
            isOpen: false,
            notifyContent: '',
            notifyType: 0
        }
    },
    reducers: {
        alertError: (state, action) => {
            state.notifyEventCom.isOpen = true
            state.notifyEventCom.notifyType = 0
            state.notifyEventCom.notifyContent = action.payload
        },
        alertSuccess: (state, action) => {
            state.notifyEventCom.isOpen = true
            state.notifyEventCom.notifyType = 1
            state.notifyEventCom.notifyContent = action.payload
        },
        endAlert: (state) => {
            state.notifyEventCom.isOpen = false
        }
    }
})

export const { 
    alertError, 
    alertSuccess, 
    endAlert, 
} =
  alertSlice.actions

const alertReducer = alertSlice.reducer

export default alertReducer
