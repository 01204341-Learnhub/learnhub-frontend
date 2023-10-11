import { useEffect, useState } from "react";
import { getCourseDetail } from "../services/courses";
import { CourseDetail } from "../types/course";

function useCourseDetail(courseID: string) {
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    async function fetchCourseDetail(courseID: string) {
      try {
        const fetchedCourseDetail = await getCourseDetail(courseID);
        setCourseDetail(fetchedCourseDetail);
      } catch (err) {
        console.log(err);
      }
    }
    setIsFetching(true);
    fetchCourseDetail(courseID).then(() => {
      setIsFetching(false);
    });
  }, [courseID]);
  return { courseDetail, isFetching };
}

export { useCourseDetail };
