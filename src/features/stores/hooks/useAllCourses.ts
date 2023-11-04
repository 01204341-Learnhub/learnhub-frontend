import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCourses } from "../../../slices/storeSlice";
import { RootState } from "../../../store";
import { listCourse } from "../services";
import { Course } from "../types/course";

function useAllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { allCourses, isFetchedOnce } = useSelector(
    (state: RootState) => state.store
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchCourses() {
      if (isFetchedOnce) {
        setIsFetching(true);
        const fetchedCourses = await listCourse();
        dispatch(setAllCourses(fetchedCourses));
        setCourses(fetchedCourses);
      } else {
        setCourses(allCourses);
        const fetchedCourses = await listCourse();
        dispatch(setAllCourses(fetchedCourses));
        setCourses(fetchedCourses);
      }
    }
    fetchCourses().then(() => {
      setIsFetching(false);
    });
  }, [allCourses, dispatch, isFetchedOnce]);
  return { courses, isFetching };
}

export { useAllCourses };
