import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import ClassCard from "../../features/teaches/components/ClassCard";
import NewProgramClass from "../../features/teaches/components/NewProgramCard";
import { useTeachClasses } from "../../features/teaches/hooks/useTeachClasses";

function SelectTeachingClass() {
  const { classes, isFetchingClasses } = useTeachClasses()
  const navigate = useNavigate();
  if (isFetchingClasses) return <div>loading...</div>;
  return (
    <div className="ml-10">
      <div className="flex items-center m-6">
        <h1 className="font-bold text-2xl">คลาสเรียนของฉัน</h1>
        <h2 className="rounded-full font-semibold px-2 py-1 bg-[#FF9B9B] ml-5">
          class
        </h2>
      </div>
      <ul className="grid grid-cols-5 gap-3 ml-5">
        {classes.map(
          (c) => (
            <li key={c.classID} className="mt-5">
              <Link to={`/teach/classes/${c.classID}`} >
                <ClassCard
                  classID={c.classID}
                  className={c.className}
                  classThumbnailUrl={c.classThumbnailUrl}
                  studentCount={c.studentCount}
                  studentLimit={c.studentLimit}
                  percentCompleted={c.percentCompleted}
                />
              </Link>
            </li>
          ),
        )}
        <NewProgramClass
          type="คลาส"
          onClick={() => {
            navigate({ pathname: '/teach/create/class' })
          }}
        />
      </ul>
    </div>
  );
}

export default SelectTeachingClass;
