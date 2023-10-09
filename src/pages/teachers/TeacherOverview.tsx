import { useNavigate } from "react-router-dom";
import Calendar from "../../features/learns/components/Calendar";
import ClassCard from "../../features/teaches/components/ClassCard";
import CourseCard from "../../features/teaches/components/CourseCard";
import NewProgramClass from "../../features/teaches/components/NewProgramCard";
import { useTeachCourses } from "../../features/teaches/hooks/useTeachCourses";
import { useTeachClasses } from "../../features/teaches/hooks/useTeachClasses";

function TeacherOverview() {

  const navigate = useNavigate();
  const {courses,isFetchingCourse}=useTeachCourses()
  const {classes,isFetchingClasses}=useTeachClasses()

  function handleNavigate(type: string) {
    navigate(`/teach/create/${type}`);
  }

  if (isFetchingCourse || isFetchingClasses) return <div>loading...</div>;

  return (
    <div className="flex flex-col px-8 pb-6">
      <div className="h-8"></div>
      <div className="flex items-center">
        <div className="w-4/6 mx-5 bg-[#d9d9d9]">
          <h1 className="pl-12 pt-6 text-2xl font-bold">
            สร้างคอร์สเรียน/คลาสเรียน
          </h1>
          <div className="flex pl-4">
            <div className="mx-5 my-5">
              <NewProgramClass
                type="คอร์ส"
                onClick={() => {
                  handleNavigate("course");
                }}
              />
            </div>
            <div className="mx-5 my-5">
              <NewProgramClass
                type="คลาส"
                onClick={() => {
                  handleNavigate("class");
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-2/6 mb-1 bg-white self-stretch">
          <Calendar />
        </div>
      </div>
      <div className="flex m-6 items-center py-4">
        <h1 className="font-bold text-2xl">คอร์สเรียนของฉัน</h1>
        <h2 className="rounded-full font-semibold px-2 py-1 bg-[#FF9B9B] ml-5">course</h2>
      </div>
      <ul className="grid grid-cols-5 gap-5 ml-5">
        {courses.map(
          ({
            courseID,
            name: courseName,
            rating: courseRating,
            thumbnailUrl: courseThumbnailUrl,
            studentCount,
          }) => (
            <li key={courseID}>
              <CourseCard
                courseName={courseName}
                courseThumbnailUrl={courseThumbnailUrl}
                courseRating={courseRating}
                studentCount={studentCount}
              />
            </li>
          ),
        )}
      </ul>
      <div className="flex m-6 items-center py-4">
        <h1 className="font-bold text-2xl">คลาสเรียนที่กำลังดำเนิน</h1>
        <h2 className="rounded-full bg-[#ADE792] ml-5 font-semibold px-2 py-1">course</h2>
      </div>
      <ul className="grid grid-cols-5 gap-5 ml-5">
        {classes.map(
          ({
            classID,
            className,
            classThumbnailUrl,
            percentCompleted,
            studentLimit,
            studentCount,
          }) => (
            <li key={classID}>
              <ClassCard
                className={className}
                classThumbnailUrl={classThumbnailUrl}
                percentCompleted={percentCompleted}
                studentCount={studentCount}
                studentLimit={studentLimit}
              />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export default TeacherOverview;
