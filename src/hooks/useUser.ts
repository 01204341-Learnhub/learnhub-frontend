import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase/firebase";
import { RootState } from "../store";

function useUser() {
  const { user } = useSelector((state: RootState) => state.user);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsFetching(false);
      if (user == null) {
        localStorage.removeItem("learnhubUser");
        // setUser(undefined);
      }
    });
    return unsubscribe;
  }, []);

  return { user, isFetching };
}

export { useUser };
