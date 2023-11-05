import { useEffect, useState } from "react";
import { listAllClasses } from "../services/classes";
import { ClassProgram } from "../types/class";

function useAllClasses() {
  const [classes, setClasses] = useState<ClassProgram[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    async function fetchAllClasses() {
      setIsFetching(true);
      const fetchedClasses = await listAllClasses();
      setClasses(fetchedClasses);
      setIsFetching(false);
    }
    fetchAllClasses();
  }, []);
  return { classes, isFetching };
}

export { useAllClasses };
