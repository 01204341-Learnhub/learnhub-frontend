import { useEffect, useState } from "react";
import { listTeachCourse } from "../../../features/teaches/services/courses.ts";
import { useUser } from "../../../hooks/useUser.ts";
import { CourseInfo } from "../types/course.ts";

export function useTeachCourses() {
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const [isFetchingCourse, setIsFetching] = useState<boolean>(false);
  const { user } = useUser();
  useEffect(() => {
    async function fetchCoursesAndClasses() {
      const fetchedCourses = await listTeachCourse(user.userID);
      setCourses(fetchedCourses);
    }
    setIsFetching(true);
    fetchCoursesAndClasses().then(() => {
      setIsFetching(false);
    });
  }, [user.userID]);
  return { courses, isFetchingCourse };
}
