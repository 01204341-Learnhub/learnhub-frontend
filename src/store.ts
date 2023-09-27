import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
