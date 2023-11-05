import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./slices/basketSlice";
import storeSlice from "./slices/storeSlice";
import uiSlice from "./slices/uiSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
    basket: basketSlice,
    store: storeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
