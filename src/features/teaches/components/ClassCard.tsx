import { Link } from "react-router-dom";

interface ClassCardProps {
  classThumbnailUrl: string;
  className: string;
  percentCompleted: number;
  studentCount: number;
  studentLimit: number;
  classID: string;
}

export default function ClassCard(myClassesCard: ClassCardProps) {
  return (
    <div className="card w-[249px] h-[304px] bg-base-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] hover:shadow-xl cursor-pointer">
      <img
        className="object-cover h-[146px] w-full rounded-t-[20px] pointer-events-none"
        src={myClassesCard.classThumbnailUrl}
        alt="Course Thumbnail Picture"
      />
      <div className="px-3 pt-2 text-[14px] align-middle font-bold">
        {myClassesCard.className}
      </div>
      {/* <div className="px-3 pt-4 text-[12px] font-semibold">ความคืบหน้า</div> */}
      {/* <div className="px-3">
        <progress
          className="progress"
          value={`${myClassesCard.percentCompleted}`}
          max="100"
        ></progress>
      </div> */}
      {/* <div className="px-3 pt-1 text-[12px] font-semibold text-end">{`${myClassesCard.percentCompleted}%`}</div> */}
      <div className="px-3 pt-1 text-[12px] font-semibold">
        มีผู้เรียน {myClassesCard.studentCount}/{myClassesCard.studentLimit}
      </div>
      <div className="absolute right-[12px] bottom-[12px]">
        <Link to={`/teach/update-class/${myClassesCard.classID}`}>
          <button className="w-[60px] h-[30px] rounded-full bg-gray-600 hover:shadow-xl hover:bg-gray-800 text-[14px] text-base-200 font-semibold text-center">
              แก้ไข
          </button>
        </Link>
      </div>
    </div>
  );
}
