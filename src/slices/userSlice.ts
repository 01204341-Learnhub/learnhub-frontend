import { createSlice } from "@reduxjs/toolkit";
import { LearnhubUser } from "../types/user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("learnhubUser")) as LearnhubUser,
  },
  reducers: {
    changeProfilePicture: (state, action) => {
      const newProfilePic = action.payload as string;
      state.user.profilePicture = newProfilePic;
      localStorage.setItem("learnhubUser", JSON.stringify(state.user));
    },
    clearUser: (state) => {
      state.user = undefined;
    },
    setLearnhubUser: (state, action) => {
      state.user = action.payload as LearnhubUser;
    },
  },
});
export default userSlice.reducer;
export const { changeProfilePicture, clearUser, setLearnhubUser } =
  userSlice.actions;
