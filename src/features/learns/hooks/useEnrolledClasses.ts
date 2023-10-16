import { useEffect, useState } from "react";
import { listEnrolledClass } from "../services/classes";
import { EnrolledClass } from "../types/classes";

function useEnrolledClasses(studentID: string) {
  const [enrolledClasses, setEnrolledCourses] = useState<EnrolledClass[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchEnrolledClasses(studentID: string) {
      const fetchedEnrolledCourses = await listEnrolledClass(studentID);
      setEnrolledCourses(fetchedEnrolledCourses);
    }
    setIsFetching(true);
    fetchEnrolledClasses(studentID).then(() => {
      setIsFetching(false);
    });
  }, [studentID]);
  return { enrolledClasses, isFetching };
}

export { useEnrolledClasses };
