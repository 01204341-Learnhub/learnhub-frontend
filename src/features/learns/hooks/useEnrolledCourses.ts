import { useEffect, useState } from "react";
import { listEnrolledCourses } from "../services/courses";
import { EnrolledCourse } from "../types/course";

function useEnrolledCourses(studentID: string) {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchEnrolledCourses(studentID: string) {
    const fetchedEnrolledCourses = await listEnrolledCourses(studentID);
    setEnrolledCourses(fetchedEnrolledCourses);
  }
  useEffect(() => {
    setIsFetching(true);
    fetchEnrolledCourses(studentID).then(() => {
      setIsFetching(false);
    });
  }, [studentID]);
  return { enrolledCourses, isFetching };
}

export { useEnrolledCourses };
