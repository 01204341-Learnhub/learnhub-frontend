import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Class, Reply, Thread } from "../../features/learns/types/thread";
import Mock from "../../features/learns/services/thread";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import PeopleSvg from "../../assets/images/people.svg";
import { LearnhubUser } from "../../types/user";

type PathParams = {
  [key: string]: string;
  classId: string;
  homeworkId: string;
};

interface _ReplyEntryProps {
  reply: Reply;
  currentDate: Date;
}

type HomeworkContext = {
  user: LearnhubUser;
  cls: Class;
  thread: Thread;
  handleAddReply: (text: string) => void;
  handleAddHomeworkFile: (file: File) => void;
  handleDeleteHomeworkFile: (fileId: string) => void;
};

const HomeworkContext = createContext<HomeworkContext | undefined>(undefined);

function _TopNavbar() {
  const { cls } = useContext(HomeworkContext);
  const navigate = useNavigate();
  return (
    <div className="flex space-x-4 p-5 border-b-2">
      <h1
        className="text-black text-[32px] font-bold cursor-pointer"
        onClick={() => navigate("/learn/classes")}
      >
        {"คลาสเรียน"}
      </h1>
      <h1 className="text-black text-[32px] font-bold ml-2">{">"}</h1>
      <h1
        className="text-black text-[32px] font-bold ml-2 cursor-pointer"
        onClick={() => navigate(`/learn/classes/${cls.classId}`)}
      >
        {cls.name}
      </h1>
    </div>
  );
}

function _ReplyEntry({ reply, currentDate }: _ReplyEntryProps) {
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
            {currentDate.getTime() - reply.date.getTime() > 1000 * 60 * 60 * 24
              ? reply.date.toLocaleDateString("th-TH", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })
              : `${reply.date.toLocaleTimeString("th-TH", {
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

function _ReplyInputBar() {
  const { user, handleAddReply: onAddReply } = useContext(HomeworkContext);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [replyText, setReplyText] = useState<string>("");

  const handleTextareaChange = () => {
    if (textareaRef.current) {
      setReplyText(textareaRef.current.value);
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
        value={replyText}
        onChange={handleTextareaChange}
        className="resize-none border-2 border-[#808080] rounded-[15px] py-2 px-3 w-full"
        placeholder="เพิ่มความเห็น ..."
      ></textarea>
      <button
        className="flex flex-col justify-end pb-3 hover:opacity-80"
        onClick={() => {
          if (replyText === "") return;
          onAddReply(replyText);
          setReplyText("");
        }}
      >
        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
      </button>
    </div>
  );
}

function _MainContent() {
  const { thread } = useContext(HomeworkContext);
  const [showRepliesAndTextBox, setShowRepliesAndTextBox] = useState<boolean>(
    thread.replies.length === 0 ? false : true
  );
  const currentDate = new Date();
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
      <div className={showRepliesAndTextBox ? "block" : "hidden"}>
        <div className="flex items-center space-x-5 px-3 pt-5">
          <img src={PeopleSvg} width={23} />
          <h3 className="text-[#808080] text-[18px] font-bold">
            ความคิดเห็นสำหรับงานนี้
          </h3>
        </div>
        <div className="flex flex-col space-y-5 px-4 pt-6">
          {thread.replies.map((reply, index) => (
            <_ReplyEntry key={index} reply={reply} currentDate={currentDate} />
          ))}
        </div>
        <div className="mt-10 w-[95%]">
          <_ReplyInputBar />
        </div>
      </div>
    </div>
  );
}

function _FileUploader() {
  const {
    handleAddHomeworkFile: onAddHomeworkFile,
    handleDeleteHomeworkFile: onDeleteHomeworkFile,
  } = useContext(HomeworkContext);
  return <div className="bg-red-200">hello</div>;
}

function LearningHomeworkDetail() {
  const { classId, homeworkId } = useParams<PathParams>();
  // const { user } = useSelector((state: RootState) => state.user);
  const user = Mock.students[0];
  const [cls, setCls] = React.useState<Class | undefined>(undefined);
  const [thread, setThread] = React.useState<Thread | undefined>(undefined);
  const mock = new Mock(classId, homeworkId, user, true);
  useEffect(() => {
    mock
      .fetchClass()
      .then((cls) => {
        setCls(cls);
      })
      .catch((err) => {
        console.log(err);
      });
    mock
      .fetchThread()
      .then((thread) => {
        setThread(thread);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleAddReply = (text: string) => {
    mock
      .addReply(text)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddHomeworkFile = (file: File) => {
    mock
      .addHomeworkFile(file, (progress) => {
        console.log(progress);
      })
      .then((id) => {
        console.log(`file id: ${id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteHomeworkFile = (fileId: string) => {
    mock
      .deleteHomeworkFile(fileId)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full h-full bg-[#eeeeee80] overflow-auto">
      {user && cls && thread && (
        <HomeworkContext.Provider
          value={{
            user: user,
            cls: cls,
            thread: thread,
            handleAddReply: handleAddReply,
            handleAddHomeworkFile: handleAddHomeworkFile,
            handleDeleteHomeworkFile: handleDeleteHomeworkFile,
          }}
        >
          <_TopNavbar />
          <div className="flex p-5 mt-5 justify-center items-start space-x-5 w-full">
            <div className="max-w-[760px] min-w-[380px] w-full">
              <_MainContent />
            </div>
            <div className="min-w-[300px] w-[300px]">
              <_FileUploader />
            </div>
          </div>
        </HomeworkContext.Provider>
      )}
    </div>
  );
}

export default LearningHomeworkDetail;
