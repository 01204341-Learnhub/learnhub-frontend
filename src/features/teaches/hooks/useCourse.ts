import { useEffect, useState } from "react";
import { getCourse } from "../services/courses";
import { Course } from "../types/course";

function useCourse(courseID: string) {
  const [course, setCourse] = useState<Course>();
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    async function fetchCourse() {
      const fetchedCourse = await getCourse(courseID);
      fetchedCourse.chapters.sort((a, b) => a.number - b.number);
      fetchedCourse.chapters.forEach((chapter) => {
        chapter.lessons.sort((a, b) => a.number - b.number);
      });
      setCourse(fetchedCourse);
    }
    setIsFetching(true);
    fetchCourse().then(() => {
      setIsFetching(false);
    });
  }, [courseID]);
  return { course, isFetching, setCourse };
}

export { useCourse };
