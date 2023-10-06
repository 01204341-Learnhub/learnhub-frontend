import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./slices/basketSlice";
import uiSlice from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    basket: basketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
