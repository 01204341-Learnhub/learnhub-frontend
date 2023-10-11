import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimpleThread } from "../types/classes";
import { LearnhubUser } from "../../../types/user";
import { toDateTimeStringOmitDateOnSameDay } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";

interface ClassHomeworkThreadProps {
  teacher: LearnhubUser;
  simpleThread: SimpleThread;
  classId: string;
}

function ClassHomeworkThread({
  teacher,
  simpleThread,
  classId,
}: ClassHomeworkThreadProps) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white border-[1px] border-[#a0a0a080] rounded-[10px] p-5 w-full cursor-pointer hover:drop-shadow-md"
      onClick={() =>
        navigate(`/learn/classes/${classId}/homeworks/${simpleThread.threadId}`)
      }
    >
      <div className="flex space-x-5 items-center">
        <div className="flex justify-center items-center min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-[#D9D9D9] rounded-full">
          <FontAwesomeIcon icon={faClipboardList} size="xl" />
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-black text-[16px] font-[500]">{`${teacher.username} โพสต์งานใหม่แล้ว: ${simpleThread.name}`}</p>
          <p className="text-[#A0A0A0] text-[14px] font-[500]">
            {toDateTimeStringOmitDateOnSameDay(simpleThread.lastEdit)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClassHomeworkThread;
