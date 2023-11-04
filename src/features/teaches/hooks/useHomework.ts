import { useEffect, useState } from "react";
import { LearnhubUser } from "../../../types/user";
import { addClassHomeworkReply, getHomeworkDetail } from "../services/homework";
import { HomeworkDetail } from "../types/homework";

function useHomework(
  learnhubUser: LearnhubUser,
  classId: string,
  homeworkId: string
) {
  const [user] = useState<LearnhubUser>(learnhubUser);
  const [homework, setHomework] = useState<HomeworkDetail | undefined>(
    undefined
  );

  useEffect(
    () => {
      updateHomework();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  // IMPORTANT: Empty dependency array in useEffect is needed to prevent infinite loop.
  
  const updateHomework = () => {
    getHomeworkDetail(classId, homeworkId)
      .then((homework) => {
        setHomework(homework);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update homework");
      });
  };

  const addReply = (text: string) => {
    addClassHomeworkReply(user.userID, classId, homeworkId, text)
      .then(() => {
        updateHomework();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add reply");
      });
  };

  return {
    homework,
    addReply,
  };
}

export default useHomework;
