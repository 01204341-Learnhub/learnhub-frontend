import { Link } from "react-router-dom";

interface CourseCardProps {
  courseID: string;
  courseThumbnailUrl: string;
  courseName: string;
  instructorName: string;
  percentCompleted: number;
}





export default function CourseCard(myCoursesCard: CourseCardProps) {
  return (
    <div className="w-[249px] h-[254px] bg-base-200 rounded-tl-[20px] rounded-tr-[20px]">
       <Link to={`/learn/courses/${myCoursesCard.courseID}`}>
        <img
          className="object-cover h-[146px] w-full rounded-t-[20px] pointer-events-none"
          src={myCoursesCard.courseThumbnailUrl}
          alt="Course Thumbnail Picture"
        />
        <div className="px-3 pt-2 text-[14px] font-bold">
          {myCoursesCard.courseName}
        </div>
        <div className="px-3 pt-1 text-[12px] text-gray-500 font-semibold">
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
       </Link>
    </div>
  );
}
