import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    newProducts: null
  },
  reducers: {
    setProducts: (state, action) => {
      console.log('VVVACTION', action.payload)
      state.newProducts = action.payload
    }
  }
})

export const { 
  setProducts
} = productSlice.actions

const productReducer = productSlice.reducer

export default productReducer
