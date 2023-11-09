import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    newProducts: null
  },
  reducers: {
    setProducts: (state, action) => {
      state.newProducts = action.payload
    }
  }
})

export const { 
  setProducts
} = productSlice.actions

const productReducer = productSlice.reducer

export default productReducer
