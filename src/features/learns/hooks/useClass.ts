import { useEffect, useState } from "react";
import { getClass } from "../services/classes";
import { Class } from "../types/classes";

function useClass(classId: string) {
  const [cls, setCls] = useState<Class>();
  const [isFetching, setIsFetching] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    async function fetchClass() {
      const fetchedCls = await getClass(classId);
      setCls(fetchedCls);
    }
    fetchClass().then(() => {
      setIsFetching(false);
    });
  }, [classId, reload]);
  const updateClass = () => {
    setReload(reload + 1);
  };

  return { cls, isFetching, updateClass };
}

export default useClass;
