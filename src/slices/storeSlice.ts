import { createSlice } from "@reduxjs/toolkit";
import { ClassProgram } from "../features/stores/types/class";
import { Course } from "../features/stores/types/course";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    allCourses: [] as Course[],
    allClasses: [] as ClassProgram[],
    isFetchedOnce: false,
  },
  reducers: {
    setAllCourses: (state, action) => {
      state.allCourses = action.payload;
      if (state.isFetchedOnce) {
        state.isFetchedOnce = true;
      }
    },
    setAllClasses: (state, action) => {
      state.allClasses = action.payload;
      if (state.isFetchedOnce) {
        state.isFetchedOnce = true;
      }
    },
  },
});
export default storeSlice.reducer;
export const { setAllCourses, setAllClasses } = storeSlice.actions;
