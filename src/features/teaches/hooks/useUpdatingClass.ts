import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { getClass } from "../services/classes";
import { CreatingClass } from "../types/class";

function useUpdatingClass(classID: string) {
  const { user } = useUser();
  const [cls, setCls] = useState<CreatingClass>();
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    async function fetchUpdatingClass() {
      setIsFetching(true);
      const fetchedCls = await getClass(classID);
      fetchedCls.teacher = user;
      setCls(fetchedCls);
      setIsFetching(false);
    }
    fetchUpdatingClass();
  }, [classID, user]);
  return { cls, setCls, isFetching };
}

export { useUpdatingClass };
