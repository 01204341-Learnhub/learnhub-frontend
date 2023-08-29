interface MyCoursesCard {
  courseThumbnailUrl: string;
  courseName: string;
  instructorName: string;
  percentCompleted: number;
}

export default function MyCoursesCard(myCoursesCard: MyCoursesCard) {
  return (
    <div className="card w-[249px] h-[304px] bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]">
      <img
        className="object-cover h-[146px] rounded-t-[20px]"
        src={myCoursesCard.courseThumbnailUrl}
        alt="Course Thumbnail Picture"
      />
      <div className="px-3 pt-2 text-[14px] font-bold">
        {myCoursesCard.courseName}
      </div>
      <div className="px-3 pt-1 text-[12px] text-gray-400 font-semibold col">
        {myCoursesCard.instructorName}
      </div>
      <div className="px-3 pt-3 text-[12px] font-semibold">{`สำเร็จไปแล้ว ${myCoursesCard.percentCompleted}%`}</div>
      <div className="px-3">
        <progress
          className="progress"
          value={`${myCoursesCard.percentCompleted}`}
          max="100"
        ></progress>
      </div>
      <div className="rating rating-sm flex flex-row justify-end px-3 pt-2">
        <input type="radio" name="rating-1" className="mask mask-star" />
        <input type="radio" name="rating-1" className="mask mask-star" />
        <input type="radio" name="rating-1" className="mask mask-star" />
        <input type="radio" name="rating-1" className="mask mask-star" />
        <input type="radio" name="rating-1" className="mask mask-star" />
      </div>
      <div className="px-3 text-[11px] text-end">{"ให้คะแนน"}</div>
    </div>
  );
}
