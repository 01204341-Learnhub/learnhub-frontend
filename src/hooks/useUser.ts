import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../firebase/firebase";
import { LearnhubUser } from "../types/user";

function useUser() {
  const [user, setUser] = useState<LearnhubUser>();
  useEffect(() => {
    const user = localStorage.getItem("learnhubUser");
    if (user) {
      setUser(JSON.parse(user));
    }
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user == null) {
        localStorage.removeItem("learnhubUser");
        setUser(undefined);
      }
    });
    return unsubscribe;
  }, []);
  return user;
}

export { useUser };
