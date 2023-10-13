import { useEffect, useState } from "react";
import { fetchClass } from "../services/classes";
import { Class } from "../types/classes";

function useClass(classId: string) {
  const [cls, setCls] = useState<Class | undefined>(undefined);

  useEffect(
    () => {
      updateClass();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  ); // IMPORTANT: Empty dependency array in useEffect is needed to prevent infinite loop.

  const updateClass = () => {
    fetchClass(classId)
      .then((cls) => {
        setCls(cls);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update class");
      });
  };

  return { cls, updateClass };
}

export default useClass;
