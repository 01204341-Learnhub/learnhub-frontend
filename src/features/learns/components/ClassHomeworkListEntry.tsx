import { SimpleThread } from "../types/classes.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { toDateTimeStringOmitDateOnSameDay } from "../../../utils/functions.ts";
import { useNavigate } from "react-router-dom";

interface ClassHomeworkListEntryProps {
  classId: string;
  simpleThread: SimpleThread;
}

function ClassHomeworkListEntry({
  classId,
  simpleThread,
}: ClassHomeworkListEntryProps) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white w-full p-5 hover:drop-shadow-lg cursor-pointer"
      onClick={() =>
        navigate(`/learn/classes/${classId}/homeworks/${simpleThread.threadId}`)
      }
    >
      <div className="flex items-center space-x-7">
        <div className="flex justify-center items-center min-w-[55px] max-w-[55px] min-h-[55px] max-h-[55px] bg-[#D9D9D9] rounded-full">
          <FontAwesomeIcon icon={faClipboardList} size="2x" />
        </div>
        <h2 className="text-[#606060] text-[20px] font-bold">
          {simpleThread.name}
        </h2>
        <div className="flex-1"></div>
        <p className="text-[#A0A0A0] text-[20px] font-bold">
          โพสต์เมื่อ {toDateTimeStringOmitDateOnSameDay(simpleThread.lastEdit)}
        </p>
      </div>
    </div>
  );
}

export default ClassHomeworkListEntry;
