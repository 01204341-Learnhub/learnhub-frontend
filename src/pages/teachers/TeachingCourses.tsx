import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../features/teaches/components/CourseCard";
import NewProgramClass from "../../features/teaches/components/NewProgramCard";
import { listTeachCourse } from "../../features/teaches/services/courses";
import { CourseInfo } from "../../features/teaches/types/course";

function TeachingCourses() {
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCourses() {
      const fetchedCourses = await listTeachCourse("1");
      setCourses(fetchedCourses);
    }

    setIsFetching(true);
    fetchCourses().then(() => {
      setIsFetching(false);
    });
  }, []);

  function handleNavigate(type: string) {
    navigate(`/teach/create/${type}`);
  }

  if (isFetching) return <div>loading...</div>;
  return (
    <div className="ml-10">
      <div className="flex m-6">
        <h1 className="font-bold text-2xl">คอร์สเรียนของฉัน</h1>
        <h2 className="rounded-t-lg rounded-b-lg bg-pink-500 justify-center items-center flex m-3">
          course
        </h2>
        <div className="flex drop-shadow-md ml-5">
          <input
            type="text"
            className="input input-bordered w-full rounded-none"
            placeholder="ค้นหาคอร์สเรียนของฉัน"
          />
          <div className="bg-black flex justify-center items-center px-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" color="white" />
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-5 gap-3 ml-5">
        {courses.map(
          ({
            courseID,
            courseName,
            courseRating,
            courseThumbnailUrl,
            studentCount,
          }) => (
            <li key={courseID} className="mt-5">
              <CourseCard
                courseName={courseName}
                courseThumbnailUrl={courseThumbnailUrl}
                courseRating={courseRating}
                studentCount={studentCount}
              />
            </li>
          ),
        )}
        <NewProgramClass
          type="คอร์ส"
          onClick={() => {
            handleNavigate("course");
          }}
        />
      </ul>
    </div>
  );
}

export default TeachingCourses;
