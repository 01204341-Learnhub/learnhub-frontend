import { createSlice } from "@reduxjs/toolkit";
import { ClassProgram } from "../features/stores/types/class";
import { Course } from "../features/stores/types/course";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    allCourses: [] as Course[],
    allClasses: [] as ClassProgram[],
    isFetchCoursesOnce: false,
    isFetchClassesOnce: false,
  },
  reducers: {
    setAllCourses: (state, action) => {
      state.allCourses = action.payload;
      if (state.isFetchCoursesOnce) {
        state.isFetchCoursesOnce = true;
      }
    },
    setAllClasses: (state, action) => {
      state.allClasses = action.payload;
      if (state.isFetchClassesOnce) {
        state.isFetchClassesOnce = true;
      }
    },
  },
});
export default storeSlice.reducer;
export const { setAllCourses, setAllClasses } = storeSlice.actions;
