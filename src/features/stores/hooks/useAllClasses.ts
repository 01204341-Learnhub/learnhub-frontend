import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllClasses } from "../../../slices/storeSlice";
import { RootState } from "../../../store";
import { listAllClasses } from "../services/classes";
import { ClassProgram } from "../types/class";

function useAllClasses() {
  const [classes, setClasses] = useState<ClassProgram[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { allClasses, isFetchedOnce } = useSelector(
    (state: RootState) => state.store
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchAllClasses() {
      if (isFetchedOnce) {
        setIsFetching(true);
        const fetchedClasses = await listAllClasses();
        setClasses(fetchedClasses);
        dispatch(setAllClasses(fetchedClasses));
        setIsFetching(false);
      } else {
        setClasses(allClasses);
        const fetchedClasses = await listAllClasses();
        dispatch(setAllClasses(fetchedClasses));
        setClasses(fetchedClasses);
      }
    }
    fetchAllClasses();
  }, [allClasses, dispatch, isFetchedOnce]);
  return { classes, isFetching };
}

export { useAllClasses };
