import { useContext, useRef, useState } from "react";
import { Reply, Thread } from "../types/thread";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import PeopleSvg from "../../../assets/Images/people.svg";
import { UserContext } from "../../../pages/students/LearningHomeworkDetail";
import { toDateTimeStringOmitDateOnSameDay } from "../../../utils/functions";
import ClassThreadAttachment from "./ClassThreadAttachment";

interface _ReplyEntryProps {
  reply: Reply;
}

function _ReplyEntry({ reply }: _ReplyEntryProps) {
  return (
    <div className="flex w-full space-x-5">
      <img
        src={reply.user.profilePicture}
        className="rounded-full min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] bg-[#d9d9d9] mt-1"
        alt={`https://robohash.org/${reply.user.userID}`}
      />
      <div className="flex flex-col w-full space-y-0.3">
        <div className="flex space-x-3">
          <p className="text-'[#505050] text-[16px] font-semibold">
            {reply.user.username}
          </p>
          <p className="text-[#707070] text-[14px] font-normal">
            {toDateTimeStringOmitDateOnSameDay(reply.dateTime)}
          </p>
        </div>
        <p className="text-[#707070] text-[16px] font-medium w-[75%] break-words">
          {reply.text}
        </p>
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

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
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
        className="rounded-full min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] bg-[#d9d9d9] mt-1"
        alt={`https://robohash.org/${user.userID}`}
      />
      <textarea
        id="reply-textarea"
        name="reply-textarea"
        ref={textareaRef}
        value={replyTextInput}
        onChange={() => {
          setReplyTextInput(textareaRef.current.value);
          adjustTextareaHeight();
        }}
        className="resize-none border-2 border-[#808080] rounded-[15px] py-2 px-3 w-full"
        placeholder="เพิ่มความเห็น ..."
      ></textarea>
      <button
        className="flex flex-col justify-end pb-3 hover:opacity-80"
        onClick={() => {
          if (replyTextInput === "") return;
          onAddReply(replyTextInput);
          setReplyTextInput("");
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
          }
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

  return (
    <div className="bg-white p-5 w-full">
      <div className="flex items-start space-x-5 pb-4 border-b-2 w-full">
        <div className="flex items-center justify-center rounded-full bg-[#d9d9d9] min-w-[55px] max-w-[55px] min-h-[55px] max-h-[55px]">
          <FontAwesomeIcon icon={faClipboardList} size="2x" />
        </div>
        <div className="w-full">
          <h1 className="text-black text-[22px] font-bold">{thread.name}</h1>
          <div className="flex justify-between items-start w-full mt-1">
            <p className="text-[#404040] text-[14px] font-semibold">
              {thread.homeworkSubmissionStatus === "submitted-and-graded" &&
              thread.homeworkGotScore !== undefined
                ? `${thread.homeworkGotScore}/`
                : ""}
              {thread.homeworkFullScore} คะแนน
            </p>
            <p className="text-[#404040] text-[14px] font-semibold">
              {`กำหนดส่ง ${toDateTimeStringOmitDateOnSameDay(
                thread.homeworkDueDateTime
              )}`}
            </p>
          </div>
        </div>
      </div>
      <div
        className={
          thread.text.length > 0 || thread.attachments.length > 0
            ? "block"
            : "hidden"
        }
      >
        <div className="mt-4 pb-4 border-b-2">
          <p className="text-[#404040] text-[16px] font-medium mx-3 w-[95%] break-words">
            {thread.text}
          </p>
          <div className={thread.attachments.length > 0 ? "block" : "hidden"}>
            <div className="flex flex-wrap mx-3 mt-4">
              {thread.attachments.map((attachment, index) => (
                <div key={index} className="m-1">
                  <ClassThreadAttachment attachment={attachment} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={showRepliesAndTextBox ? "hidden" : "block"}>
        <button
          className="text-[#404040] text-[18px] font-bold mx-3 mt-4 hover:opacity-80"
          onClick={() => setShowRepliesAndTextBox(true)}
        >
          เพิ่มความคิดเห็นสำหรับงานนี้
        </button>
      </div>
      <div className={showRepliesAndTextBox ? "block" : "hidden"}>
        <div className="flex items-center space-x-5 mx-3 mt-4">
          <img src={PeopleSvg} width={23} />
          <h3 className="text-[#808080] text-[18px] font-bold">
            ความคิดเห็นสำหรับงานนี้
          </h3>
        </div>
        <div className={thread.replies.length > 0 ? "block" : "hidden"}>
          <div className="flex flex-col w-full space-y-5 mx-3 mt-5">
            {thread.replies.map((reply, index) => (
              <_ReplyEntry key={index} reply={reply} />
            ))}
          </div>
        </div>
        <div className="mt-7 w-[95%]">
          <_ReplyInputBar onAddReply={onAddReply} />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
