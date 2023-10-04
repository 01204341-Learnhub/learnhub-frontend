import { createSlice } from "@reduxjs/toolkit";
import { Basket, BasketItem } from "../features/stores/types/basket";


export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: {
      items: []
    } as Basket,
    isFetchOnce : false,
    iSLoading : false

  },
  reducers: {
    addItem: (state, action) => {
      state.basket.items.push(action.payload as BasketItem);
    },
    removeItem: (state, action) => {
      const index = state.basket.items.findIndex(
        (item) => item.itemID === action.payload
      );
      if (index !== -1) {
        state.basket.items.splice(index, 1);
      }
    },
    clearItem: (state) => {
      state.basket.items = [];
    },

    setStatusFetchOnce : (state, action) => {
      state.isFetchOnce = action.payload as boolean
    },

    setStatusIsLoading : (state, action) => {
      state.iSLoading = action.payload as boolean
    }
  },
});
export default basketSlice.reducer;
export const { addItem, removeItem, clearItem, setStatusFetchOnce, setStatusIsLoading } = basketSlice.actions;
