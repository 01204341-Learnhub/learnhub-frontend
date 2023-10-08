import { createSlice } from "@reduxjs/toolkit";
import { LearnhubUser } from "../types/user";

export const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(
    localStorage.getItem("learnhubUser")
  ) as LearnhubUser,
  reducers: {
    changeProfilePicture: (state, action) => {
      const newProfilePic = action.payload as string;
      state.profilePicture = newProfilePic;
    },
  },
});
export default userSlice.reducer;
export const { changeProfilePicture } = userSlice.actions;
