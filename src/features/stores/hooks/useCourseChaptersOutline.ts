import { useEffect, useState } from "react";
import { ListCourseChaptersOutline } from "../services/courses";
import { CourseChapterOutline } from "../types/course";

function useCourseChaptersOutline(couseID: string) {
  const [courseChaptersOutline, setCourseChaptersOutline] = useState<
    CourseChapterOutline[]
  >([]);
  const [isFetching, setIsFetching] = useState(false);
  async function fetchOutline(courseID: string) {
    const fetchedOutline = await ListCourseChaptersOutline(courseID);
    setCourseChaptersOutline(fetchedOutline);
  }
  useEffect(() => {
    setIsFetching(true);
    fetchOutline(couseID).then(() => {
      setIsFetching(false);
    });
  }, [couseID]);
  return { courseChaptersOutline, isFetching };
}

export { useCourseChaptersOutline };
