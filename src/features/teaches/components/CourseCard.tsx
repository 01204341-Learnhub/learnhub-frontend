import ReviewStarsDisplay from "../../../components/ReviewStarsDisplay";

interface CourseCardProps {
  courseThumbnailUrl: string;
  courseName: string;
  courseRating: number;
  studentCount: number;
}

export default function CourseCard(myCoursesCard: CourseCardProps) {
  return (
    <div className="card w-[249px] h-[304px] bg-base-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] hover:shadow-xl cursor-pointer">
      <img
        className="object-cover h-[146px] rounded-t-[20px] pointer-events-none"
        src={myCoursesCard.courseThumbnailUrl}
        alt="Course Thumbnail Picture"
      />
      <div className="px-3 pt-2 text-[14px] font-bold">
        {myCoursesCard.courseName}
      </div>
      <div className="pt-4">
        <ReviewStarsDisplay rating={myCoursesCard.courseRating} />
      </div>
      <div className="px-3 pt-4 text-[14px] font-semibold">
        จำนวนผู้เรียน {myCoursesCard.studentCount} คน
      </div>
      <div className="absolute right-[12px] bottom-[12px]">
        <button className="w-[60px] h-[30px] rounded-full bg-gray-600 hover:shadow-xl hover:bg-gray-800">
          <div className="text-[14px] text-base-200 font-semibold text-center">
            แก้ไข
          </div>
        </button>
      </div>
    </div>
  );
}
