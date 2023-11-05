import { useEffect, useState } from "react";
import { listCourseChapters } from "../services/courseChapters";
import { CourseChapter } from "../types/courseChapters";

function useCourseChapters(courseId: string) {
  const [chapters, setChapters] = useState<CourseChapter[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  async function fetchCourseChapters(courseId: string) {
    const fetchedCourseChapters = await listCourseChapters(courseId);
    fetchedCourseChapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
    setChapters(fetchedCourseChapters);
  }
  useEffect(() => {
    setIsFetching(true);
    fetchCourseChapters(courseId).then(() => {
      setIsFetching(false);
    });
  }, [courseId]);
  return { chapters, isFetching };
}

export { useCourseChapters };
