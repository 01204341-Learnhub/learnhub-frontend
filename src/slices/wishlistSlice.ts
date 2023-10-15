import { createSlice } from "@reduxjs/toolkit";
import { Wishlist, WishlistItem } from "../features/stores/types/wishlist";


export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: {
      items: []
    } as Wishlist,
    isWishFetchOnce : false,
    iSWishLoading : false

  },
  reducers: {
    addWishItem: (state, action) => {
      state.wishlist.items.push(action.payload as WishlistItem);
    },
    removeWishItem: (state, action) => {
      const index = state.wishlist.items.findIndex(
        (item) => item.itemID === action.payload
      );
      if (index !== -1) {
        state.wishlist.items.splice(index, 1);
      }
    },
    clearWishItem: (state) => {
      state.wishlist.items = [];
    },

    setWishStatusFetchOnce : (state, action) => {
      state.isWishFetchOnce = action.payload as boolean
    },

    setWishStatusIsLoading : (state, action) => {
      state.iSWishLoading = action.payload as boolean
    }
  },
});
export default wishlistSlice.reducer;
export const { addWishItem, removeWishItem, clearWishItem, setWishStatusFetchOnce, setWishStatusIsLoading } = wishlistSlice.actions;
