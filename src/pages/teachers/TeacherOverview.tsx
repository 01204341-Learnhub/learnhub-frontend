import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../features/learns/components/Calendar";
import ClassCard from "../../features/teaches/components/ClassCard";
import CourseCard from "../../features/teaches/components/CourseCard";
import NewProgramClass from "../../features/teaches/components/NewProgramCard";
import { listTeacherClasses } from "../../features/teaches/services/classes";
import { listTeachCourse } from "../../features/teaches/services/courses";
import { ClassInfo } from "../../features/teaches/types/class.ts";
import { CourseInfo } from "../../features/teaches/types/course";

function TeacherOverview() {
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCoursesAndClasses() {
      const fetchedCourses = await listTeachCourse("1");
      const fetchedClasses = await listTeacherClasses("1");
      setCourses(fetchedCourses);
      setClasses(fetchedClasses);
    }

    setIsFetching(true);
    fetchCoursesAndClasses().then(() => {
      setIsFetching(false);
    });
  }, []);

  function handleNavigate(type: string) {
    navigate(`/teach/create/${type}`);
  }

  if (isFetching) return <div>loading...</div>;

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
            courseName,
            courseRating,
            courseThumbnailUrl,
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
