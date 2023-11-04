import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toDateTimeStringOmitDateOnSameDay } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";

interface ClassHomeworkOverviewEntryProps {
  classId: string;
  homeworkId: string;
  homeworkName: string;
  homeworkLastEdit: Date;
}

function ClassHomeworkOverviewEntry({
  classId,
  homeworkId,
  homeworkName,
  homeworkLastEdit,
}: ClassHomeworkOverviewEntryProps) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white border-[1px] border-[#a0a0a080] rounded-[10px] p-5 w-full cursor-pointer hover:drop-shadow-md"
      onClick={() =>
        navigate(`/teach/classes/${classId}/homeworks/${homeworkId}`)
      }
    >
      <div className="flex space-x-5 items-center">
        <div className="flex justify-center items-center min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-[#D9D9D9] rounded-full">
          <FontAwesomeIcon icon={faClipboardList} size="xl" />
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-black text-[16px] font-[500]">{`คุณโพสต์งานใหม่แล้ว: ${homeworkName}`}</p>
          <p className="text-[#A0A0A0] text-[14px] font-[500]">
            {toDateTimeStringOmitDateOnSameDay(homeworkLastEdit)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClassHomeworkOverviewEntry;
