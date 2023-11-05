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
import { Thread } from "../../features/teaches/types/thread";
import ClassHomeworkOverviewEntry from "../../features/teaches/components/ClassHomeworkOverviewEntry";

type View = "main" | "works" | "members" | "create-work";

interface ViewSlectorProps {
  currentView: View;
  setView: (view: View) => void;
}
function _ViewSelector({ currentView, setView }: ViewSlectorProps) {
  return (
    <div className="flex flex-col w-full">
      <div className=" flex ml-10 text-lg font-medium self-start">
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
          <div
            className={`bg-black ${currentView == "main" ? "h-2" : ""}`}
          ></div>
        </div>
        <div
          className="m-5"
          onClick={() => {
            setView("works");
          }}
        >
          <button
            className={
              currentView == "works" ? "text-[#000]" : "text-[#808080]"
            }
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
      <div>
        <hr className="w-full h-[2px] bg-gray-300" />
      </div>
    </div>
  );
}

function _WorkSlot({ work }: { work: ClassAssignment }) {
  const [isOpen, setISOpen] = useState(false);
  return (
    <div className="w-full">
      <button
        className="bg-white flex mx-3 items-center w-full drop-shadow-lg"
        onClick={() => setISOpen(!isOpen)}
      >
        <div className="bg-white flex items-center py-2 px-4">
          <div className="flex justify-center items-center bg-[#D9D9D9] w-14 h-14  rounded-full">
            <FontAwesomeIcon
              icon={faClipboardList}
              size="2xl"
              className=" drop-shadow-lg"
            />
          </div>
          <h1 className="text-sm text-gray-600 font-bold ml-5">{work.name}</h1>
        </div>
      </button>
      {isOpen && (
        <div className="flex flex-col items-center justify-center mx-3 w-full border-[1px] drop-shadow-lg bg-white">
          <div className="flex items-center w-11/12">
            <p className="break-all py-4">{work.description}</p>
          </div>

          <div className="flex justify-end w-9/12 pb-8 pt-4">
            <div className="items-end flex flex-col">
              <p className="w-full text-4xl font-bold ml-5">{work.send}</p>
              <p className="text-sm text-[#808080] font-semibold ml-5">
                ส่งแล้ว
              </p>
            </div>
            <div className="items-end flex flex-col">
              <p className="w-full text-4xl font-bold ml-5">{work.nosend}</p>
              <p className="text-sm text-[#808080] font-semibold ml-5">
                ยังไม่ส่ง
              </p>
            </div>
          </div>
          <hr className="w-full py-2" />

          <div className="bg-white flex items-center w-11/12 justify-end py-5 px-5">
            <div className="">
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
    <div className="h-full w-7/12">
      <button className="btn m-7" onClick={onCreateClassWork}>
        <FontAwesomeIcon icon={faPlus} size="xl" />
        <h1 className="text-xl">สร้าง</h1>
      </button>
    </div>;
  }
  return (
    <div className="h-full w-7/12">
      <button className="btn m-7" onClick={onCreateClassWork}>
        <FontAwesomeIcon icon={faPlus} size="xl" />
        <h1 className="text-xl">สร้าง</h1>
      </button>
      {getAllTopics().map((topic, index) => (
        <div key={index}>
          <h1 className="mx-10 text-black font-bold text-xl my-2">{topic}</h1>
          <hr className="mx-10 h-[2px] bg-gray-300" />
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
  const {
    threads,
    isFetching: isFetchingClassThreads,
    postThread,
  } = useClassThreads(classID);
  const entries: (Thread | ClassAssignment)[] = [...threads, ...assignments];
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
    );
  }

  if (view == "main") {
    return (
      <div className=" flex flex-col items-center w-full">
        <_ViewSelector currentView={view} setView={setView} />
        <hr />
        <div className="mx-7 mt-8 w-full">
          <div className="flex items-center ml-16">
            <h1 className="text-2xl font-bold text-black">
              {classInfo.className}
            </h1>
            <h1 className=" px-3 py-1 font-semibold  bg-[#ADE792] ml-5 rounded-l-full rounded-r-full ">
              class
            </h1>
          </div>
          <div className="relative mt-7 w-full flex items-center justify-center">
            <img
              src={classInfo.classThumbnailUrl}
              alt="class-cover"
              className="object-cover w-11/12 h-64 "
            />
            <button className="absolute btn-ghost text-white bottom-0 right-20">
              แก้ไข
            </button>
          </div>
        </div>
        <div className="w-3/4 mt-[2%] flex flex-col items-center space-y-[2%]">
          <div className="w-3/4">
            <FormPublishPostClass handleAddPost={postThread} />
          </div>

          <div className="flex flex-col w-3/4 items-center space-y-3 pb-4">
            {entries
              .sort((a, b) => b.lastEdit.getTime() - a.lastEdit.getTime())
              .map((entry: Thread | ClassAssignment) => {
                if ("topic" in entry) {
                  // is ClassAssignment
                  return (
                    <ClassHomeworkOverviewEntry
                      key={entry.assignmentID}
                      classId={classID}
                      homeworkId={entry.assignmentID}
                      homeworkName={entry.name}
                      homeworkLastEdit={entry.lastEdit}
                    />
                  );
                } else {
                  return (
                    <ClassThread
                      key={entry.threadId}
                      user={user}
                      classId={classID}
                      threadId={entry.threadId}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    );
  } else if (view == "works") {
    return (
      <div className="h-full flex flex-col items-center w-full">
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
      <div className="h-full py-5 flex flex-col items-center w-full">
        <_ViewSelector currentView={view} setView={setView} />
        <hr />
        <div className="flex flex-col w-3/4 items-center">
          <p className="text-lg self-start text-gray-600 font-bold ml-5 my-5">
            ผู้สอน
          </p>
          <div className="w-full flex bg-white  items-center border-[1px]">
            <div className=" justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-12 h-12 m-2 rounded-full">
              <img
                src={user.profilePicture}
                className="rounded-full object-cover aspect-square h-12 w-12"
              />
            </div>
            <h1 className=" text-gray-600 font-bold ml-5">{user.fullname}</h1>
          </div>
        </div>

        <div className="flex flex-col w-3/4 items-center">
          <p className="text-lg self-start text-gray-600 font-bold ml-5 my-5">
            ผู้เรียนในคลาส
          </p>
          <div className="w-full flex flex-col items-center">
            {students.map((student, index) => {
              return (
                <div
                  className="w-full flex bg-white  items-center border-[1px]"
                  key={index}
                >
                  <div className=" justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-12 h-12 m-2 rounded-full">
                    <img
                      src={student.avatarURL}
                      className="rounded-full object-cover aspect-square w-12 h-122"
                    />
                  </div>
                  <h1 className=" text-gray-600 font-bold ml-5">
                    {student.name}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else if (view == "create-work") {
    return (
      <div className="w-full">
        <WorkCreate
          availableTopics={getAvaliableTopics()}
          onCancel={() => {
            setView("works");
          }}
          onSubmit={handleAddAssignment}
        />
      </div>
    );
  } else if (view == "review-work") {
    // return <Workreview />;
    return <div></div>;
  }
}

export default TeachingClasses;
