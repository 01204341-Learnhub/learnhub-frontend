import { createSlice } from "@reduxjs/toolkit";
import { LearnhubUser } from "../types/user";

export const userSlice = createSlice({
  name: "ui",
  initialState: {
    user: undefined as LearnhubUser | undefined,
  },
  reducers: {
    setUser: (state, action) => {
      const learnhubUser = action.payload as LearnhubUser;
      console.log(`from setUser: ${JSON.stringify(learnhubUser)}`);

      state.user = learnhubUser;
      console.log(`set user to ${JSON.stringify(state)}`);
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});
export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
