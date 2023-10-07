import React, { createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Class, generateMockUser } from "../../features/learns/types/thread";
import { LearnhubUser } from "../../types/user";
import useThread from "../../hooks/useThread";
import MainContent from "../../features/learns/components/ClassHomeworkDetailMainContent";
import FileUploader from "../../features/learns/components/ClassHomeworkDetailFileUploader";

interface _TopNavbarProps {
  cls: Class;
  threadName: string;
}

function _TopNavbar({ cls, threadName }: _TopNavbarProps) {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-4 p-5 border-b-2">
      <button
        className="text-black text-[32px] font-bold hover:opacity-80"
        onClick={() => navigate("/learn/classes")}
      >
        {"คลาสเรียน"}
      </button>
      <h1 className="text-black text-[32px] font-bold">{">"}</h1>
      <button
        className="text-black text-[32px] font-bold ml-2 hover:opacity-80"
        onClick={() => navigate(`/learn/classes/${cls.classId}`)}
      >
        {cls.name}
      </button>
      <h1 className="text-black text-[32px] font-bold">{">"}</h1>
      <button className="text-black text-[32px] font-bold ml-2 hover:opacity-80">
        {threadName}
      </button>
    </div>
  );
}

type PathParams = {
  [key: string]: string;
  classId: string;
  homeworkId: string;
};

const UserContext = createContext<LearnhubUser | undefined>(undefined);

function LearningHomeworkDetail() {
  const { classId, homeworkId } = useParams<PathParams>();
  // Call useUser hook here and remove the mock user below.
  const user = generateMockUser("student", "student0");
  const { thread, addReply, addHomeworkFile, removeHomeworkFile } = useThread(
    user,
    classId,
    homeworkId,
    "homework"
  );

  return (
    <UserContext.Provider value={user}>
      <div className="w-full h-full bg-[#eeeeee80] overflow-auto">
        {thread && (
          <>
            <_TopNavbar cls={thread.cls} threadName={thread.name} />
            <div className="flex p-5 mt-5 justify-center items-start space-x-5 w-full">
              <div className="max-w-[760px] min-w-[380px] w-full">
                <MainContent thread={thread} onAddReply={addReply} />
              </div>
              <div className="min-w-[300px] w-[300px]">
                <FileUploader
                  thread={thread}
                  onAddHomeworkFile={addHomeworkFile}
                  onRemoveHomeworkFile={removeHomeworkFile}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default LearningHomeworkDetail;
export { UserContext };
