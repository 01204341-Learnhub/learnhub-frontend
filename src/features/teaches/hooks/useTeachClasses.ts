import { useEffect, useState } from "react";
import { ClassInfo } from "../types/class.ts";
import { useUser } from "../../../hooks/useUser.ts";
import { listTeacherClasses } from "../../../features/teaches/services/classes.ts";

export function useTeachClasses() {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [isFetchingClasses, setIsFetching] = useState<boolean>(false);
  const { user } = useUser()
  async function fetchCoursesAndClasses() {
    const fetchedClasses = await listTeacherClasses(user.userID);
    setClasses(fetchedClasses);
  }
  useEffect(() => {
    setIsFetching(true);
    fetchCoursesAndClasses().then(() => {
      setIsFetching(false);
    });
  }, []);
  return { classes, isFetchingClasses };

}

