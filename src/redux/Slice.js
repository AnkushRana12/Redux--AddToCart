import { createSlice } from "@reduxjs/toolkit";

const initialState = {
items:localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state,action) => {
      console.log(action.payload)
      state.value += 1;
      state.items.push(action.payload);
      localStorage.setItem('cart',JSON.stringify(state.items))
    },
    removeItem: (state,action) => {
     const cartData=state.items.filter(item=> item.id!=action.payload.id);
     state.items=cartData;
     localStorage.setItem('cart',JSON.stringify(cartData))
    },
    clearAllItems: (state) => {
      state.items = []
    },
  },
});

export const { addItem, removeItem, clearAllItems } = cartSlice.actions;
export default cartSlice.reducer;
