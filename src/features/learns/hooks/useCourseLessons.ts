import { useEffect, useState } from "react";
import { listCourseLessons } from "../services/lessons";
import { CourseLesson } from "../types/lessons";

function useCourseLessons(courseID: string, chapterID: string) {
  const [lessons, setLessons] = useState<CourseLesson[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  async function fetchLessons(courseID: string, chapterID: string) {
    const fetchedLessons = await listCourseLessons(courseID, chapterID);
    fetchedLessons.sort((a, b) => a.lessonNumber - b.lessonNumber);
    setLessons(fetchedLessons);
  }
  useEffect(() => {
    setIsFetching(true);
    fetchLessons(courseID, chapterID).then(() => {
      setIsFetching(false);
    });
  }, [courseID, chapterID]);
  return { lessons, isFetching };
}

export { useCourseLessons };
