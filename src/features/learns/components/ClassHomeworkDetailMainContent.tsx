import { useContext, useRef, useState } from "react";
import { Reply, Thread } from "../types/thread";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import PeopleSvg from "../../../assets/images/people.svg";
import { UserContext } from "../../../pages/students/LearningHomeworkDetail";

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

interface MainContent {
  thread: Thread;
  onAddReply: (text: string) => void;
}

function MainContent({ thread, onAddReply }: MainContent) {
  const [showRepliesAndTextBox, setShowRepliesAndTextBox] = useState<boolean>(
    thread.replies.length === 0 ? false : true
  );
  const currentDateTime = new Date();
  return (
    <div className="bg-white p-5 w-full">
      <div className="flex items-center space-x-5 pb-5 border-b-2 w-full">
        <div className="flex justify-center items-center rounded-full bg-[#d9d9d9] min-w-[55px] min-h-[55px]">
          <FontAwesomeIcon icon={faClipboardList} size="2x" />
        </div>
        <div className="w-full">
          <h1 className="text-black text-[22px] font-bold">{thread.name}</h1>
          <div className="flex justify-between w-full mt-0.5">
            <p className="text-[#404040] text-[14px] font-semibold">
              {thread.homeworkFullPoints} คะแนน
            </p>
            <p className="text-[#404040] text-[14px] font-semibold">
              กำหนดส่ง{" "}
              {thread.homeworkDueDateTime.toLocaleString("th-TH", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
      <div className={thread.text != "" ? "block" : "hidden"}>
        <p className="text-[#404040] text-[16px] font-medium mt-5 pb-5 border-b-2 w-full">
          {thread.text}
        </p>
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

export default MainContent;
