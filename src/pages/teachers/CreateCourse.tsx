import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCardPreview from "../../features/teaches/components/CourseCardPreview";
import CourseChapterCreate from "../../features/teaches/components/CourseChapterCreate";
import CourseChapterInfo from "../../features/teaches/components/CourseChapterInfo";
import CourseCreateStepper from "../../features/teaches/components/CourseCreateStepper";
import {
  availableCategories,
  Course,
} from "../../features/teaches/types/course";
import CourseGoalsInfoForm from "../../features/teaches/components/CourseGoalsInfoForm.tsx";
import CoursePublishingInfoForm from "../../features/teaches/components/CoursePublishingInfoForm.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faCircle as faCircleSolid,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

interface _SideNavProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  onPublish?: () => void;
  readyToPublish: boolean;
}

function _SideNav({
  currentTab,
  onChangeTab,
  onPublish,
  readyToPublish,
}: _SideNavProps) {
  return (
    <div className="flex flex-col justify-start items-start space-y-5 min-w-fit">
      <div className="bg-white flex flex-col justify-start items-start p-5 space-y-3 w-fit h-fit">
        <button
          className="flex justify-start items-center space-x-4"
          onClick={() => {
            onChangeTab("content");
          }}
        >
          <FontAwesomeIcon
            icon={currentTab === "content" ? faCircleSolid : faCircleRegular}
            color="black"
          />
          <h1 className="font-semibold text-black text-[18px]">
            เพิ่มเนื้อหาของคอร์ส
          </h1>
        </button>
        <button
          className="flex justify-start items-center space-x-4"
          onClick={() => {
            onChangeTab("goals");
          }}
        >
          <FontAwesomeIcon
            icon={currentTab === "goals" ? faCircleSolid : faCircleRegular}
            color="black"
          />
          <h1 className="font-semibold text-black text-[18px]">
            เป้าหมายของคอร์ส
          </h1>
        </button>
        <button
          className="flex justify-start items-center space-x-4"
          onClick={() => {
            onChangeTab("publishing");
          }}
        >
          <FontAwesomeIcon
            icon={currentTab === "publishing" ? faCircleSolid : faCircleRegular}
            color="black"
          />
          <h1 className="font-semibold text-black text-[18px]">
            การเผยแพร่คอร์ส
          </h1>
        </button>
      </div>
      <button
        className={`w-fit h-fit p-3 hover:drop-shadow-md ${
          !readyToPublish || onPublish === undefined
            ? "bg-gray-200"
            : "bg-[#D9D9D9]"
        }`}
        onClick={onPublish}
      >
        <h1
          className={`font-semibold text-[20px] ${
            !readyToPublish || onPublish === undefined
              ? "text-gray-400"
              : "text-black"
          }`}
        >
          เผยแพร่คอร์ส
        </h1>
      </button>
    </div>
  );
}

interface _TopNavProps {
  onQuit: () => void;
}

function _TopNav({ onQuit }: _TopNavProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-black font-semibold text-[32px]">สร้างคอร์ส</h1>
      <button className="flex items-center space-x-4 w-fit" onClick={onQuit}>
        <h1 className="text-black font-semibold text-[29px]">ออก</h1>
        <FontAwesomeIcon icon={faArrowRight} color="black" size="lg" />
      </button>
    </div>
  );
}

interface _TopPanelProps {
  course: Course;
}

function _TopPanel({ course }: _TopPanelProps) {
  return (
    <div className="flex justify-start items-stretch space-x-10 w-full">
      <div className="bg-[#D9D9D9] p-6 w-fit h-fit">
        <CourseCardPreview
          courseThumbnailUrl={course.thumbnailUrl}
          courseName={course.name}
          lvl={course.level}
          price={course.price}
          tag={
            availableCategories.find(
              (category) => category.categoryId === course.categoryId,
            )?.name
          }
          instructorName={course.instructorName}
        />
      </div>
      <div className="flex flex-col justify-start items-start space-y-3 px-10 py-6 bg-white w-full min-w-fit">
        <h1 className="text-black text-[20px] font-semibold mb-4">ภาพรวม</h1>
        <div className="flex justify-between w-1/2 min-w-fit">
          <h2 className="text-[#808080] text-[20px] font-semibold">
            จำนวนบทเรียน
          </h2>
          <div className="flex-grow"></div>
          <h2 className="text-[#808080] text-[20px] font-semibold">
            {course.chapters.length}
          </h2>
        </div>
        <div className="flex justify-between w-1/2 min-w-fit">
          <h2 className="text-[#808080] text-[20px] font-semibold">
            จำนวนคลิปวิดีโอ
          </h2>
          <h2 className="text-[#808080] text-[20px] font-semibold">
            {
              // the number of lessons of type "video" in all chapters
              course.chapters.reduce(
                (prev, curr) =>
                  prev +
                  curr.lessons.reduce(
                    (prev, curr) => (curr.type === "video" ? prev + 1 : prev),
                    0,
                  ),
                0,
              )
            }
          </h2>
        </div>
        <div className="flex justify-between w-1/2 min-w-fit">
          <h2 className="text-[#808080] text-[20px] font-semibold">
            จำนวนเอกสาร
          </h2>
          <h2 className="text-[#808080] text-[20px] font-semibold">
            {
              // the number of lessons of type "doc" in all chapters
              course.chapters.reduce(
                (prev, curr) =>
                  prev +
                  curr.lessons.reduce(
                    (prev, curr) => (curr.type === "doc" ? prev + 1 : prev),
                    0,
                  ),
                0,
              )
            }
          </h2>
        </div>
        <div className="flex justify-between w-1/2 min-w-fit">
          <h2 className="text-[#808080] text-[20px] font-semibold">
            จำนวนแบบทดสอบ
          </h2>
          <h2 className="text-[#808080] text-[20px] font-semibold">
            {
              // the number of lessons of type "quiz" in all chapters
              course.chapters.reduce(
                (prev, curr) =>
                  prev +
                  curr.lessons.reduce(
                    (prev, curr) => (curr.type === "quiz" ? prev + 1 : prev),
                    0,
                  ),
                0,
              )
            }
          </h2>
        </div>
        <div className="flex justify-between w-1/2 min-w-fit">
          <h2 className="text-[#808080] text-[20px] font-semibold">
            จำนวนไฟล์ที่ดาวน์โหลดได้
          </h2>
          <h2 className="text-[#808080] text-[20px] font-semibold">
            {
              // the number of lessons of type "file" in all chapters
              course.chapters.reduce(
                (prev, curr) =>
                  prev +
                  curr.lessons.reduce(
                    (prev, curr) => (curr.type === "file" ? prev + 1 : prev),
                    0,
                  ),
                0,
              )
            }
          </h2>
        </div>
      </div>
    </div>
  );
}

function checkReadyToPublish(course: Course) {
  return (
    course.name !== "" &&
    course.categoryId !== "" &&
    course.level !== "" &&
    course.instructorName !== "" &&
    course.description !== "" &&
    course.chapters.length !== 0 &&
    course.chapters.every((chapter) => chapter.lessons.length !== 0) &&
    course.chapters.every((chapter) =>
      chapter.lessons.every((lesson) => {
        if (lesson.type === "video") {
          return lesson.videoUrl !== null && lesson.videoUrl !== "";
        } else if (lesson.type === "doc") {
          return lesson.doc !== null;
        } else if (lesson.type === "quiz") {
          return lesson.quiz !== null;
        } else if (lesson.type === "file") {
          return lesson.fileUrl !== null && lesson.fileUrl !== "";
        } else {
          return false;
        }
      }),
    )
  );
}

interface CourseContextType {
  course: Course;
  setCourse: (course: Course) => void;
}

const CourseContext = React.createContext<CourseContextType | undefined>(
  undefined,
);

function CreateCourse() {
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course>({
    courseId: "1234567890", // TODO: Get an ID, possibly uuid.
    name: "",
    thumbnailUrl: "https://picsum.photos/seed/picsum/200/300",
    categoryId: "",
    level: "",
    instructorName: "John Doe",
    description: "",
    objectives: ["", "", "", ""],
    requirement: "",
    price: 0,
    rating: 0,
    studentCount: 0,
    chapters: [],
  });
  const [currentTab, setCurrentTab] = useState<string>("content");
  const [initializedCourse, setInitializedCourse] = useState<boolean>(false);

  const handleInitializeCourse = () => {
    setInitializedCourse(true);
    setCurrentTab("content");
  };

  const handlePublishCourse = () => {
    // TODO: Send the course to the server.
    console.log(course);
  };

  if (initializedCourse === false) {
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <CourseContext.Provider
          value={{
            course,
            setCourse,
          }}
        >
          <CourseCreateStepper onSubmit={handleInitializeCourse} />
        </CourseContext.Provider>
      </div>
    );
  }

  if (currentTab === "content") {
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <_TopPanel course={course} />
        <div className="flex justify-start items-start space-x-10 w-full h-fit">
          <_SideNav
            currentTab="content"
            onChangeTab={setCurrentTab}
            onPublish={handlePublishCourse}
            readyToPublish={checkReadyToPublish(course)}
          />
          <div className="flex flex-col justify-start space-y-5 w-full h-fit p-8 bg-white">
            {course.chapters.map((chapter) => (
              <CourseChapterInfo chapter={chapter} />
            ))}
            <button
              className="bg-[#D9D9D9] p-3 w-fit h-fit hover:drop-shadow-md"
              onClick={() => {
                setCurrentTab("add-chapter");
              }}
            >
              <h1 className="text-black font-semibold text-[20px]">
                เพิ่มบทเรียน
              </h1>
            </button>
          </div>
        </div>
      </div>
    );
  } else if (currentTab == "goals") {
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <_TopPanel course={course} />
        <div className="flex justify-start items-start space-x-10 w-full h-fit">
          <_SideNav
            currentTab="goals"
            onChangeTab={setCurrentTab}
            onPublish={handlePublishCourse}
            readyToPublish={checkReadyToPublish(course)}
          />
          <CourseContext.Provider value={{ course, setCourse }}>
            <CourseGoalsInfoForm />
          </CourseContext.Provider>
        </div>
      </div>
    );
  } else if (currentTab == "publishing") {
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <_TopPanel course={course} />
        <div className="flex justify-start items-start space-x-10 w-full h-fit">
          <_SideNav
            currentTab="publishing"
            onChangeTab={setCurrentTab}
            onPublish={handlePublishCourse}
            readyToPublish={checkReadyToPublish(course)}
          />
          <CourseContext.Provider value={{ course, setCourse }}>
            <CoursePublishingInfoForm />
          </CourseContext.Provider>
        </div>
      </div>
    );
  } else if (currentTab == "add-chapter") {
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <CourseContext.Provider value={{ course, setCourse }}>
          <CourseChapterCreate
            onSubmit={() => {
              setCurrentTab("content");
            }}
            onCancel={() => {
              setCurrentTab("content");
            }}
          />
        </CourseContext.Provider>
      </div>
    );
  }
}

export default CreateCourse;
export { CourseContext };
