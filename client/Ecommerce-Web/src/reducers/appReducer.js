import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    categories: null
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    }
  }
})

export const { 
  setCategories
} = appSlice.actions

const appReducer = appSlice.reducer

export default appReducer
