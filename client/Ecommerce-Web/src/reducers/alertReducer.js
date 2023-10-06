import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState: {
        notifyEventCom: {
            isOpen: false,
            notifyContent: '',
            notifyType: 0,
            isNoTime: false
        }
    },
    reducers: {
        alertError: (state, action) => {
            state.notifyEventCom.isOpen = true
            state.notifyEventCom.notifyType = 0
            state.notifyEventCom.notifyContent = action.payload
            state.notifyEventCom.isNoTime = false
        },
        alertSuccess: (state, action) => {
            state.notifyEventCom.isOpen = true
            state.notifyEventCom.notifyType = 1
            state.notifyEventCom.notifyContent = action.payload
            state.notifyEventCom.isNoTime = false
        },
        endAlert: (state) => {
            state.notifyEventCom.isOpen = false
        },
        setNoTimeNotify: (state, action) => {
            state.notifyEventCom.isOpen = true
            state.notifyEventCom.notifyType = 0
            state.notifyEventCom.notifyContent = action.payload
            state.notifyEventCom.isNoTime = true
        }
    }
})

export const { 
    alertError, 
    alertSuccess, 
    endAlert, 
    setNoTimeNotify 
} =
  alertSlice.actions

const alertReducer = alertSlice.reducer

export default alertReducer
