import { faClipboardList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import WorkCreate from "../../features/teaches/components/WorkCreate";
import { ClassAssignment } from "../../features/teaches/types/classWork";
// import Workreview from "../../features/teaches/components/reviewwork"
import { Link, useParams } from "react-router-dom";
import { LoadingSpash } from "../../components/LoadingSpash";
import ClassThread from "../../features/teaches/components/ClassThread";
import { FormPublishPostClass } from "../../features/teaches/components/FormPublishPostClass";
import { useClassAssignments } from "../../features/teaches/hooks/useClassAssignments";
import { useClassInfo } from "../../features/teaches/hooks/useClassInfo";
import { useClassStudents } from "../../features/teaches/hooks/useClassStudents";
import useClassThreads from "../../features/teaches/hooks/useClassThreads";
import { useUser } from "../../hooks/useUser";

type View = "main" | "works" | "members" | "create-work";

interface ViewSlectorProps {
  currentView: View;
  setView: (view: View) => void;
}
function _ViewSelector({ currentView, setView }: ViewSlectorProps) {
  return (
    <div className="flex text-lg font-medium">
      <div
        className="m-5"
        onClick={() => {
          setView("main");
        }}
      >
        <button
          className={currentView == "main" ? "text-[#000]" : "text-[#808080]"}
        >
          หน้าหลักในชั้นเรียน
        </button>
        <div className={`bg-black ${currentView == "main" ? "h-2" : ""}`}></div>
      </div>
      <div
        className="m-5"
        onClick={() => {
          setView("works");
        }}
      >
        <button
          className={currentView == "works" ? "text-[#000]" : "text-[#808080]"}
        >
          งานในชั้นเรียน
        </button>
        <div
          className={`bg-black ${currentView == "works" ? "h-2" : ""}`}
        ></div>
      </div>
      <div
        className="m-5"
        onClick={() => {
          setView("members");
        }}
      >
        <button
          className={
            currentView == "members" ? "text-[#000]" : "text-[#808080]"
          }
        >
          คนในชั้นเรียน
        </button>
        <div
          className={`bg-black ${currentView == "members" ? "h-2" : ""}`}
        ></div>
      </div>
    </div>
  );
}

function _WorkSlot({ work }: { work: ClassAssignment }) {
  const [isOpen, setISOpen] = useState(false);
  return (
    <div className="w-full">
      <button
        className="bg-white flex m-3 items-center w-full"
        onClick={() => setISOpen(!isOpen)}
      >
        <div className="bg-white flex m-3 items-center">
          <div className="flex justify-center items-center bg-[#D9D9D9] w-16 h-16 m-2 rounded-full">
            <FontAwesomeIcon icon={faClipboardList} size="2xl" />
          </div>
          <h1 className="text-xl text-gray-600 font-bold ml-5">{work.name}</h1>
        </div>
      </button>
      {isOpen && (
        <div className="">
          <div className="flex items-center border-2 px-5 py-5 h-fit">
            <p className="w-8/12 border-4 h-fit break-all">
              {work.description}
            </p>
            <div className="w-2/12 items-end">
              <p className="w-full text-xl text-gray-600 font-bold ml-5">
                {work.send}
              </p>
              <p className="text-xl text-gray-600 font-bold ml-5">ส่งแล้ว</p>
            </div>
            <div className="w-2/12 items-end">
              <p className="w-full text-xl text-gray-600 font-bold ml-5">
                {work.nosend}
              </p>
              <p className="text-xl text-gray-600 font-bold ml-5">ยังไม่ส่ง</p>
            </div>
          </div>
          <div className="bg-white flex  items-center border-2 py-5 px-5">
            <button type="button" className="text-blue-600 w-10/12">
              ดูวิธีการ
            </button>
            <div className="w-2/12 items-end">
              <Link
                to={`review/${work.assignmentID}`}
                className="bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                ตรวจงาน
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
interface _ClassWorksProps {
  onCreateClassWork: () => void;
  assignments: ClassAssignment[];
}
function _ClassWorks({ onCreateClassWork, assignments }: _ClassWorksProps) {
  const getAllTopics = () => {
    const topics: string[] = [];
    assignments.forEach((w) => {
      if (!topics.includes(w.topic)) {
        topics.push(w.topic);
      }
    });
    return topics;
  };
  if (assignments.length == 0) {
    <div className="h-full w-full">
      <button className="btn m-7" onClick={onCreateClassWork}>
        <FontAwesomeIcon icon={faPlus} size="xl" />
        <h1 className="text-xl">สร้าง</h1>
      </button>
    </div>;
  }
  return (
    <div className="h-full w-full">
      <button className="btn m-7" onClick={onCreateClassWork}>
        <FontAwesomeIcon icon={faPlus} size="xl" />
        <h1 className="text-xl">สร้าง</h1>
      </button>
      {getAllTopics().map((topic, index) => (
        <div key={index}>
          <h1 className="mx-10 text-black font-bold text-3xl my-2">{topic}</h1>
          <hr className="mx-10 h-1.5 bg-gray-300" />
          <div className="my-16">
            {assignments
              .filter((w) => w.topic == topic)
              .map((w) => (
                <div className="mx-10" key={w.assignmentID}>
                  <_WorkSlot key={w.name} work={w} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TeachingClasses() {
  const [view, setView] = useState<View>("main");
  const { classID } = useParams<{ classID: string }>();
  const { classInfo, isFetching: isFetchingClassInfo } = useClassInfo(classID);
  const {
    assignments,
    isFetching: isFetchingAssignments,
    addAssignment,
  } = useClassAssignments(classID);
  const { threads, isFetching: isFetchingClassThreads, postThread } =
    useClassThreads(classID);
  const { students } = useClassStudents(classID);
  const { user } = useUser();

  function handleAddAssignment(assignment: ClassAssignment) {
    addAssignment(assignment);
    setView("works");
  }

  function getAvaliableTopics(): string[] {
    // get all topics from assignments
    const topics: string[] = [];
    assignments.forEach((assignment) => {
      if (!topics.includes(assignment.topic)) {
        topics.push(assignment.topic);
      }
    });
    return topics;
  }

  if (isFetchingClassInfo || isFetchingAssignments || isFetchingClassThreads) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpash></LoadingSpash>
      </div>
    )
  }

  if (view == "main") {
    return (
      <div className="h-full">
        <_ViewSelector currentView={view} setView={setView} />
        <div className="mx-7 mt-8">
          <div className="flex">
            <h1 className="text-2xl font-bold text-black">
              {classInfo.className}
            </h1>
            <h1 className="px-2 py-1 bg-green-500 ml-5 rounded-l-full rounded-r-full ">
              class
            </h1>
          </div>
          <div className="mt-7">
            <img
              src={classInfo.classThumbnailUrl}
              alt="class-cover"
              className="object-cover w-full h-64"
            />
          </div>
        </div>
        <div className=" mt-[2%] flex flex-col space-y-[2%]">
          <button
            id="teacherNotAnnoucement"
            className="flex justify-center items-center"
          >
            <FormPublishPostClass handleAddPost={postThread} />
          </button>
          <div className="flex flex-col w-full space-y-3 px-16 py-5">
            {threads
              .sort((a, b) => b.lastEdit.getTime() - a.lastEdit.getTime())
              .map((thread) => (
                <ClassThread
                  key={thread.threadId}
                  user={user}
                  classId={classID}
                  threadId={thread.threadId}
                />
              ))}
          </div>
        </div>
      </div>
    );
  } else if (view == "works") {
    return (
      <div className="h-full">
        <_ViewSelector currentView={view} setView={setView} />
        <_ClassWorks
          onCreateClassWork={() => {
            setView("create-work");
          }}
          assignments={assignments}
        />
      </div>
    );
  } else if (view == "members") {
    return (
      <div className="h-full px-5 py-5">
        <_ViewSelector currentView={view} setView={setView} />
        <hr />
        <p className="text-xl text-gray-600 font-bold ml-5 my-5">ผู้สอน</p>
        <div className="w-3/4 flex bg-white  items-center border-2">
          <div className=" justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-16 h-16 m-2 rounded-full">
            <img src={user.profilePicture} className=" aspect-square rounded-full object-cover"/>
          </div>
          <h1 className="text-xl text-gray-600 font-bold ml-5">
            {user.fullname}
          </h1>
        </div>
        
        <p className="text-xl text-gray-600 font-bold ml-5 my-5">
          ผู้เรียนในคลาส
        </p>
        <div>
          {students.map((student, index) => {
            return (
              <div
                className="w-3/4 flex bg-white  items-center border-2"
                key={index}
              >
                <div className=" justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-16 h-16 m-2 rounded-full">
                  <img src={student.avatarURL} className=" aspect-square rounded-full object-cover"/>
                </div>
                <h1 className="text-xl text-gray-600 font-bold ml-5">
                  {student.name}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (view == "create-work") {
    return (
      <WorkCreate
        availableTopics={getAvaliableTopics()}
        onCancel={() => {
          setView("works");
        }}
        onSubmit={handleAddAssignment}
      />
    );
  } else if (view == "review-work") {
    // return <Workreview />;
    return <div></div>;
  }
}

export default TeachingClasses;
