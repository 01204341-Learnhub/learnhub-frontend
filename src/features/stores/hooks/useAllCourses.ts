import { useEffect, useState } from "react";
import { listCourse } from "../services";
import { Course } from "../types/course";

function useAllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  async function fetchCourses() {
    const fetchedCourses = await listCourse();
    setCourses(fetchedCourses);
  }
  useEffect(() => {
    setIsFetching(true);
    fetchCourses().then(() => {
      setIsFetching(false);
    });
  }, []);
  return { courses, isFetching };
}

export { useAllCourses };
