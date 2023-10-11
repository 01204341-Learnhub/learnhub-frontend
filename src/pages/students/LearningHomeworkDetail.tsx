import React, { createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Thread, generateMockUser } from "../../features/learns/types/thread";
import { LearnhubUser } from "../../types/user";
import useThread from "../../features/learns/hooks/useThread";
import MainContent from "../../features/learns/components/ClassHomeworkDetailMainContent";
import FileUploader from "../../features/learns/components/ClassHomeworkDetailFileUploader";

interface _TopNavbarProps {
  thread: Thread;
}

function _TopNavbar({ thread }: _TopNavbarProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-4 p-5 border-b-2">
      <button
        className="text-black text-[32px] font-bold hover:opacity-80"
        onClick={() => navigate("/learn/classes")}
      >
        {"คลาสเรียน"}
      </button>
      <h1 className="text-black text-[32px] font-bold">{">"}</h1>
      <button
        className="text-black text-[32px] font-bold ml-2 hover:opacity-80"
        onClick={() => navigate(`/learn/classes/${thread.cls.classId}`)}
      >
        {thread.cls.name}
      </button>
      <h1 className="text-black text-[32px] font-bold">{">"}</h1>
      <button className="text-black text-[32px] font-bold ml-2 hover:opacity-80">
        {thread.name}
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
  // TODO: use useUser hook
  const user = generateMockUser("student", "student0");
  const {
    thread,
    addReply,
    addHomeworkSubmissionFile,
    removeHomeworkSubmissionFile,
    submitHomework,
    unsubmitHomework,
  } = useThread(user, classId, homeworkId, "homework");

  return (
    <UserContext.Provider value={user}>
      <div className="w-full h-full bg-[#eeeeee80] overflow-auto">
        {thread && (
          <>
            <_TopNavbar thread={thread} />
            <div className="flex p-5 mt-5 justify-center items-start space-x-5 w-full">
              <div className="min-w-[410px] max-w-[770px] w-full">
                <MainContent thread={thread} onAddReply={addReply} />
              </div>
              <div className="min-w-[310px] max-w-[310px]">
                <FileUploader
                  thread={thread}
                  onAddHomeworkSubmissionFile={addHomeworkSubmissionFile}
                  onRemoveHomeworkSubmissionFile={removeHomeworkSubmissionFile}
                  onSubmitHomework={submitHomework}
                  onUnsubmitHomework={unsubmitHomework}
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
