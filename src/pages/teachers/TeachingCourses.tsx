import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSpash } from "../../components/LoadingSpash";
import CourseCard from "../../features/teaches/components/CourseCard";
import NewProgramClass from "../../features/teaches/components/NewProgramCard";
import { useTeachCourses } from "../../features/teaches/hooks/useTeachCourses";

function TeachingCourses() {
  const { courses, isFetchingCourse } = useTeachCourses()
  const navigate = useNavigate();
  if (isFetchingCourse) return <div>loading...</div>;
  function handleNavigate(type: string) {
    navigate(`/teach/create/${type}`);
  }
  if (isFetchingCourse) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpash />
      </div>
    )
  }

  return (
    <div className="ml-10">
      <div className="flex items-center m-6">
        <h1 className="font-bold text-2xl">คอร์สเรียนของฉัน</h1>
        <h2 className="rounded-full font-semibold px-2 py-1 bg-[#FF9B9B] ml-5">
          course
        </h2>
      </div>
      <ul className="grid grid-cols-5 gap-3 ml-5">
        {courses.map(
          ({
            courseID,
            name: courseName,
            rating: courseRating,
            thumbnailUrl: courseThumbnailUrl,
            studentCount,
          }) => (

            <li key={courseID} className="mt-5">
              <Link to={`/teach/course/${courseID}`}>
                <CourseCard
                  courseName={courseName}
                  courseThumbnailUrl={courseThumbnailUrl}
                  courseRating={courseRating}
                  studentCount={studentCount}
                  courseID={courseID}
                />
              </Link>
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
