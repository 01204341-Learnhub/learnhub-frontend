import { useEffect, useState } from "react";
import { InstructorProfile } from "../types/instructor";
import { getInstructor } from "../services/instructor";

function useInstructor(teacherID: string) {
  const [instructor, setinstructor] = useState<InstructorProfile >(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    async function fetchInstruction(teacherID: string) {
      try {
        const fetchInstruction = await getInstructor(teacherID);
        setinstructor(fetchInstruction);
      } catch (err) {
        console.log(err);
      }
    }
    setIsFetching(true);
    fetchInstruction(teacherID).then(() => {
      setIsFetching(false);
      console.log(instructor);
      
    });
  }, [teacherID]);
  return { instructor, isFetching };
}

export { useInstructor };
