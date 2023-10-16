import { useEffect, useState } from "react";
import { getCourseDetail } from "../services/courses";
import { CourseDetail } from "../types/course";

function useCourseDetail(courseID: string) {
  const [courseDetail, setCourseDetail] = useState<CourseDetail>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourseDetail(courseID: string) {
      try {
        const fetchedCourseDetail = await getCourseDetail(courseID);
        setCourseDetail(fetchedCourseDetail);
        setIsFetching(false);
      } catch (err) {
        console.log("Error fetching course detail:");
        
        setError(err.message);
        setCourseDetail(null);
        setIsFetching(false);
      }
    }
    fetchCourseDetail(courseID);
    console.log(courseDetail);
    
  }, [courseID, courseDetail]);

  return { courseDetail, isFetching, error};
}

export { useCourseDetail };
