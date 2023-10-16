import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { listTeacherClasses } from "../services/classes";
import { ClassInfo } from "../types/class";

function useClassInfo(classID: string) {
  const [classInfo, setClassInfo] = useState<ClassInfo>();
  const [isFetching, setIsFetching] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    async function fetchClassInfo() {
      const fetchedClassesInfo = await listTeacherClasses(user.userID);
      const info: ClassInfo = fetchedClassesInfo.find(
        (c) => c.classID === classID
      )!;
      setClassInfo(info);
    }
    fetchClassInfo().then(() => {
      setIsFetching(false);
    });
  }, [classID, user.userID]);
  return { classInfo, isFetching };
}

export { useClassInfo };
