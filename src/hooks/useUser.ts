import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../firebase/firebase";
import { LearnhubUser } from "../types/user";

function useUser() {
  const [user, setUser] = useState<LearnhubUser>(
    JSON.parse(localStorage.getItem("learnhubUser"))
  );
  const [isFetching, setIsFetching] = useState<boolean>(true);
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsFetching(false);
      if (user == null) {
        localStorage.removeItem("learnhubUser");
        setUser(undefined);
      }
    });
    return unsubscribe;
  }, []);

  return { user, isFetching };
}

export { useUser };
