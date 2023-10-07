import React, { createContext, useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Class,
  Reply,
  Thread,
  generateMockUser,
} from "../../features/learns/types/thread";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import PeopleSvg from "../../assets/images/people.svg";
import { LearnhubUser } from "../../types/user";
import useThread from "../../hooks/useThread";

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

interface _ReplyEntryProps {
  reply: Reply;
  currentDateTime: Date;
}

function _ReplyEntry({ reply, currentDateTime }: _ReplyEntryProps) {
  return (
    <div className="flex space-x-5">
      <img
        src={reply.user.profilePicture}
        className="rounded-full w-[39px] h-[39px] bg-[#d9d9d9] mt-1"
        alt={`https://robohash.org/${reply.user.userID}`}
      />
      <div className="flex flex-col space-y-0.3">
        <div className="flex space-x-3">
          <p className="text-'[#505050] text-[16px] font-semibold">
            {reply.user.username}
          </p>
          <p className="text-[#707070] text-[14px] font-normal">
            {currentDateTime.getTime() - reply.dateTime.getTime() >
            1000 * 60 * 60 * 24
              ? reply.dateTime.toLocaleDateString("th-TH", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })
              : `${reply.dateTime.toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                })} น.`}
          </p>
        </div>
        <p className="text-[#707070] text-[16px] font-medium">{reply.text}</p>
      </div>
    </div>
  );
}

interface _ReplyInputBarProps {
  onAddReply: (text: string) => void;
}

function _ReplyInputBar({ onAddReply }: _ReplyInputBarProps) {
  const user = useContext(UserContext);
  const [replyTextInput, setReplyTextInput] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = () => {
    if (textareaRef.current) {
      setReplyTextInput(textareaRef.current.value);
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 4
      }px`;
    }
  };

  return (
    <div className="flex space-x-5">
      <img
        src={user.profilePicture}
        className="rounded-full w-[39px] h-[39px] bg-[#d9d9d9] mt-1"
        alt={`https://robohash.org/${user.userID}`}
      />
      <textarea
        id="reply-textarea"
        name="reply-textarea"
        ref={textareaRef}
        value={replyTextInput}
        onChange={handleTextareaChange}
        className="resize-none border-2 border-[#808080] rounded-[15px] py-2 px-3 w-full"
        placeholder="เพิ่มความเห็น ..."
      ></textarea>
      <button
        className="flex flex-col justify-end pb-3 hover:opacity-80"
        onClick={() => {
          if (replyTextInput === "") return;
          onAddReply(replyTextInput);
          setReplyTextInput("");
        }}
      >
        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
      </button>
    </div>
  );
}

interface _MainContentProps {
  thread: Thread;
  onAddReply: (text: string) => void;
}

function _MainContent({ thread, onAddReply }: _MainContentProps) {
  const [showRepliesAndTextBox, setShowRepliesAndTextBox] = useState<boolean>(
    thread.replies.length === 0 ? false : true
  );
  const currentDateTime = new Date();
  return (
    <div className="bg-white p-5">
      <div className="flex items-center space-x-5 pb-5 border-b-2">
        <div className="flex justify-center items-center rounded-full bg-[#d9d9d9] w-[60px] h-[60px]">
          <FontAwesomeIcon icon={faClipboardList} size="2x" />
        </div>
        <div>
          <h1 className="text-black text-[22px] font-bold">{thread.name}</h1>
          <h1 className="text-[#404040] text-[14px] font-semibold">
            {thread.homeworkFullPoints} คะแนน
          </h1>
        </div>
      </div>
      <div className={!showRepliesAndTextBox ? "block" : "hidden"}>
        <button
          className="text-[#404040] text-[18px] font-bold mx-3 mt-5 hover:opacity-80"
          onClick={() => setShowRepliesAndTextBox(!showRepliesAndTextBox)}
        >
          เพิ่มความคิดเห็นสำหรับงานนี้
        </button>
      </div>
      <div className={showRepliesAndTextBox ? "block" : "hidden"}>
        <div className="flex items-center space-x-5 mx-3 mt-5">
          <img src={PeopleSvg} width={23} />
          <h3 className="text-[#808080] text-[18px] font-bold">
            ความคิดเห็นสำหรับงานนี้
          </h3>
        </div>
        <div className={thread.replies.length > 0 ? "block" : "hidden"}>
          <div className="flex flex-col space-y-5 mx-3 mt-5">
            {thread.replies.map((reply, index) => (
              <_ReplyEntry
                key={index}
                reply={reply}
                currentDateTime={currentDateTime}
              />
            ))}
          </div>
        </div>
        <div className="mt-8 w-[95%]">
          <_ReplyInputBar onAddReply={onAddReply} />
        </div>
      </div>
    </div>
  );
}

interface _FileUploaderProps {
  thread: Thread;
  onAddHomeworkFile: (name: string, src: string) => void;
  onRemoveHomeworkFile: (homeworkFileId: string) => void;
}

function _FileUploader({
  thread,
  onAddHomeworkFile,
  onRemoveHomeworkFile,
}: _FileUploaderProps) {
  thread;
  onAddHomeworkFile;
  onRemoveHomeworkFile;
  return <div className="bg-red-200">hello</div>;
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
                <_MainContent thread={thread} onAddReply={addReply} />
              </div>
              <div className="min-w-[300px] w-[300px]">
                <_FileUploader
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
