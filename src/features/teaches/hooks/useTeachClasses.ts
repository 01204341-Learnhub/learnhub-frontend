import { useEffect, useState } from "react";
import { listTeacherClasses } from "../../../features/teaches/services/classes.ts";
import { useUser } from "../../../hooks/useUser.ts";
import { ClassInfo } from "../types/class.ts";

export function useTeachClasses() {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [isFetchingClasses, setIsFetching] = useState<boolean>(false);
  const { user } = useUser();
  useEffect(() => {
    async function fetchCoursesAndClasses() {
      const fetchedClasses = await listTeacherClasses(user.userID);
      setClasses(fetchedClasses);
    }
    setIsFetching(true);
    fetchCoursesAndClasses().then(() => {
      setIsFetching(false);
    });
  }, [user.userID]);
  return { classes, isFetchingClasses };
}
