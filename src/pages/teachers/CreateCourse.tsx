import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faCircle as faCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CourseCardPreview from "../../features/teaches/components/CourseCardPreview";
import CourseChapterCreate from "../../features/teaches/components/CourseChapterCreate";
import CourseChapterInfo from "../../features/teaches/components/CourseChapterInfo";
import CourseCreateStepper from "../../features/teaches/components/CourseCreateStepper";
import CourseGoalsInfoForm from "../../features/teaches/components/CourseGoalsInfoForm.tsx";
import CourseUpdateingInfoForm from "../../features/teaches/components/CoursePublishingInfoForm.tsx";
import { useTags } from "../../features/teaches/hooks/useTags.ts";
import { createCourse } from "../../features/teaches/services/courses.ts";
import {
  Course,
} from "../../features/teaches/types/course";
import { useUser } from "../../hooks/useUser.ts";

type AvailableTab = "content" | "goals" | "publishing" | "add-chapter" | "edit-chapter";
interface _SideNavProps {
  currentTab: string;
  onChangeTab: (tab: AvailableTab) => void;
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
        className={`w-fit h-fit p-3 hover:drop-shadow-md ${!readyToPublish || onPublish === undefined
          ? "bg-gray-200"
          : "bg-[#D9D9D9]"
          }`}
        onClick={onPublish}
      >
        <h1
          className={`font-semibold text-[20px] ${!readyToPublish || onPublish === undefined
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
  const { tags: availableTags, isFetching: isFetchingTags } = useTags()
  if (isFetchingTags) return (<div>Loading...</div>)
  return (
    <div className="flex justify-start items-stretch space-x-10 w-full">
      <div className="bg-[#D9D9D9] p-6 w-fit h-fit">
        <CourseCardPreview
          courseThumbnailUrl={course.thumbnailUrl}
          courseName={course.name}
          level={course.level}
          price={course.price}
          tag={
            availableTags.find(
              (tag) => tag.tagID === course.tag.tagID,
            ) ?? { tagID: "", name: "" }
          }
          instructorName={course.instructorName}
        />
      </div>
      <div className="flex flex-col justify-start items-start space-y-3 px-10 py-6 bg-white w-full min-w-fit">
        <h1 className="text-black text-[20px] font-semibold mb-4">ภาพรวม</h1>
        <div className="flex justify-between items-center w-[400px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            จำนวนบทเรียน
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {course.chapters.length}
          </p>
        </div>
        <div className="flex justify-between items-center w-[400px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            จำนวนคลิปวิดีโอ
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
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
          </p>
        </div>
        <div className="flex justify-between items-center w-[400px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            จำนวนเอกสาร
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
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
          </p>
        </div>
        <div className="flex justify-between items-center w-[400px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            จำนวนแบบทดสอบ
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
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
          </p>
        </div>
        <div className="flex justify-between items-center w-[400px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            จำนวนไฟล์ที่ดาวน์โหลดได้
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
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
          </p>
        </div>
      </div>
    </div>
  );
}

function checkReadyToPublish(course: Course) {
  return (
    course.courseId !== "" &&
    course.name !== "" &&
    course.thumbnailUrl !== "" &&
    course.level !== "" &&
    course.instructorName !== "" &&
    course.description.trim() !== "" &&
    course.objectives.every((objective) => objective.trim() !== "") &&
    course.requirement.trim() !== "" &&
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
        } else if (lesson.type === "files") {
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
  const { user } = useUser();
  const teacherID = user.userID;
  const [chapterToEdit, setChapterToEdit] = useState(-1)
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [course, setCourse] = useState<Course>({
    courseId: "1234567890", // TODO: Get an ID, possibly uuid.
    name: "",
    thumbnailUrl: "https://placehold.co/1920x1080",
    tag: {
      name: "computer",
      tagID: "6509b76eda50b4eec1867261",
    },
    level: "",
    instructorName: user.fullname, // TODO: Get from user profile.
    description: "",
    objectives: ["", "", "", ""],
    requirement: "",
    price: 0,
    rating: 0,
    studentCount: 0,
    chapters: [],
  });
  const [currentTab, setCurrentTab] = useState<AvailableTab>("content");
  const [initializedCourse, setInitializedCourse] = useState<boolean>(false);

  const handleInitializeCourse = () => {
    setInitializedCourse(true);
    setCurrentTab("content");
  };

  const handleRemoveChapter = (chapterNumber: number) => {
    // remove chapter from course and renumber the rest of the chapters
    const newCourse = { ...course };
    newCourse.chapters = newCourse.chapters.filter((chapter) => chapter.number !== chapterNumber)
    newCourse.chapters.forEach((chapter, idx) => {
      if (chapter.number > chapterNumber) {
        newCourse.chapters[idx].number -= 1;
      }
    })
    setCourse(newCourse)
  }

  const handlePublishCourse = () => {
    async function publishCourse() {
      if (!checkReadyToPublish(course)) throw new Error("ยังกรอกข้อมูลไม่ครบ")
      await createCourse(course, teacherID);
    }
    setIsPublishing(true);
    publishCourse().then(() => {
      Swal.fire({
        title: "เผยแพร่คอร์สสำเร็จ",
        text: "คอร์สของคุณได้ถูกเผยแพร่แล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        navigate("/teach/overview");
      })
    }).catch((err) => {
      Swal.fire({
        title: "เกิดข้อผิดพลาดในการเผยแพร่คอร์ส",
        text: err,
        icon: "error",
        confirmButtonText: "ตกลง",
      })
    }).finally(() => {
      setIsPublishing(false);
    })

  };
  if (isPublishing) {
    return (
      <div className="flex flex-col justify-center items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <h1 className="text-black font-semibold text-[32px]">กำลังเผยแพร่คอร์ส</h1>
      </div>
    )
  }
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
            {course.chapters.map((chapter, idx) => (
              <div key={idx}>
                <CourseChapterInfo chapter={chapter} onEdit={() => {
                  setChapterToEdit(chapter.number)
                  setCurrentTab("edit-chapter")
                }}
                  onRemove={() => { handleRemoveChapter(chapter.number) }} />
              </div>
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
            <CourseUpdateingInfoForm />
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
  } else if (currentTab == "edit-chapter") {
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
            chapterToEdit={chapterToEdit}
          />
        </CourseContext.Provider>
      </div>
    );
  }

}

export default CreateCourse;
export { CourseContext };
