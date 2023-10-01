interface ClassCardProps {
  classThumbnailUrl: string;
  className: string;
  instructorName: string;
  percentCompleted: number;
  completionDate: Date;
}

export default function ClassCard(myClassesCard: ClassCardProps) {
  return (
    <div className="card w-[249px] h-[304px] bg-base-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] hover:shadow-xl cursor-pointer">
      <img
        className="object-cover h-[146px] w-full rounded-t-[20px] pointer-events-none"
        src={myClassesCard.classThumbnailUrl}
        alt="Course Thumbnail Picture"
      />
      <div className="absolute top-[8px] right-[9px] bg-base-200">
        <div className="px-2 text-[13px] font-semibold">คลาส</div>
      </div>
      <div className="absolute top-[117px] left-[9px] bg-base-200">
        <div className="px-2 text-[13px] font-semibold">
          ปิดคลาสวันที่{" "}
          {myClassesCard.completionDate.toLocaleDateString("th-TH")}
        </div>
      </div>
      <div className="px-3 pt-2 text-[14px] align-middle font-bold">
        {myClassesCard.className}
      </div>
      <div className="px-3 pt-1 text-[12px] text-gray-500 font-semibold">
        {myClassesCard.instructorName}
      </div>
      <div className="px-3 pt-4 text-[12px] font-semibold">ความคืบหน้า</div>
      <div className="px-3">
        <progress
          className="progress"
          value={`${myClassesCard.percentCompleted}`}
          max="100"
        ></progress>
      </div>
      <div className="px-3 pt-1 text-[12px] font-semibold text-end">{`${myClassesCard.percentCompleted}%`}</div>
    </div>
  );
}
  