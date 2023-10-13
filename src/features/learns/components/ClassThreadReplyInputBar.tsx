import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { LearnhubUser } from "../../../types/user";

interface ClassThreadReplyInputBarProps {
  user: LearnhubUser;
  onAddReply: (text: string) => void;
}

function ClassThreadReplyInputBar({
  user,
  onAddReply,
}: ClassThreadReplyInputBarProps) {
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

export default ClassThreadReplyInputBar;
