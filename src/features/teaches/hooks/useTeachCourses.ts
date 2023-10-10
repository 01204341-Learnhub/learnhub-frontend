import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser.ts";
import { CourseInfo } from "../types/course.ts";
import { listTeachCourse } from "../../../features/teaches/services/courses.ts";

export function useTeachCourses() {
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const [isFetchingCourse, setIsFetching] = useState<boolean>(false);
  const { user } = useUser()
  async function fetchCoursesAndClasses() {
    const fetchedCourses = await listTeachCourse(user.userID);
    setCourses(fetchedCourses);
  }
  useEffect(() => {
    setIsFetching(true);
    fetchCoursesAndClasses().then(() => {
      setIsFetching(false);
    });
  }, []);
  return { courses, isFetchingCourse };

}

