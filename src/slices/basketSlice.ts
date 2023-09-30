import { createSlice } from "@reduxjs/toolkit";
import { Basket, BasketItem } from "../features/stores/types/basket";

const mockBasket: Basket = {
  items: [
    {
      thumbnailURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbx7eE-vThApajEf_UUzk6v18mYG3BxAvEvw&usqp=CAU",
      programID: "1",
      name: "Item 1 bra bra bra bra bra",
      price: 100,
      description: "This is item 1",
      itemID: "1",
      teacherName: "Bara MEEHUMYAI",
      rating: 4.5,
      voter: 32465,
      totalTime: 159,
      tag: "พื้นฐาน"
    },
    {
      thumbnailURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbx7eE-vThApajEf_UUzk6v18mYG3BxAvEvw&usqp=CAU",
      programID: "2",
      name: "Item 2",
      price: 150,
      description: "This is item 2",
      itemID: "2",
      teacherName: "Bara MEEHUMYAI",
      rating: 4.5,
      voter: 32465,
      totalTime: 159,
      tag: "พื้นฐาน"
    },
  ],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: mockBasket as Basket,
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
  },
});
export default basketSlice.reducer;
export const { addItem, removeItem, clearItem } = basketSlice.actions;
