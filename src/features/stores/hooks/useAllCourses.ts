import { useEffect, useState } from "react";
import { listCourse } from "../services";
import { Course } from "../types/course";

function useAllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    async function fetchCourses() {
      setIsFetching(true);
      const fetchedCourses = await listCourse();
      setCourses(fetchedCourses);
      setIsFetching(false);
    }
    fetchCourses();
  }, []);
  return { courses, isFetching };
}

export { useAllCourses };
