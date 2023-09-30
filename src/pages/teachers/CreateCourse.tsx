import { useState } from "react";
import CourseCardPreview from "../../features/teaches/components/CourseCardPreview";
import CourseChapterCreate from "../../features/teaches/components/CourseChapterCreate";
import CourseChapterInfo from "../../features/teaches/components/CourseChapterInfo";
import CourseCreateStepper from "../../features/teaches/components/CourseCreateStepper";
import CourseGoalsInfoForm from "../../features/teaches/components/CourseGoalsInfoForm.tsx";
import {
  CourseBasicInfo,
  CourseChapter,
  CourseGoalsInfo,
  CoursePublishingInfo,
} from "../../features/teaches/types/course";
import CoursePublishingInfoForm from "../../features/teaches/components/CoursePublishingInfoForm.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faCircle as faCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface _SideNavProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  onPublish?: () => void;
  readyToPublish?: boolean;
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
          onPublish === undefined || !readyToPublish
            ? "bg-gray-200"
            : "bg-[#D9D9D9]"
        }`}
        onClick={onPublish}
      >
        <h1
          className={`font-semibold text-[20px] ${
            onPublish === undefined || !readyToPublish
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
  courseBasicInfo: CourseBasicInfo;
  courseThumbnailUrl: string;
}

function _TopPanel({ courseBasicInfo, courseThumbnailUrl }: _TopPanelProps) {
  return (
    <div className="flex justify-start items-stretch space-x-10 w-full">
      <div className="bg-[#D9D9D9] p-6 w-fit h-fit">
        <CourseCardPreview
          courseThumbnailUrl={courseThumbnailUrl}
          courseName={courseBasicInfo.courseName}
          lvl={courseBasicInfo.courseLevel}
          price={3500}
          tag={courseBasicInfo.courseCategory}
          instructorName="Baramee No PDPA"
        />
      </div>
      <div className="flex flex-col justify-start items-start space-y-3 px-10 py-6 bg-white w-full min-w-fit">
        <h1 className="text-black text-[20px] font-semibold mb-4">ภาพรวม</h1>
        <div className="flex justify-between w-1/2 min-w-fit">
          <h2 className="text-[#808080] text-[20px] font-semibold">
            จำนวนบทเรียน
          </h2>
          <div className="flex-grow"></div>
          <h2 className="text-[#808080] text-[20px] font-semibold">9</h2>
        </div>
        <div className="flex justify-between w-1/2 min-w-fit">
          <h2 className="text-[#808080] text-[20px] font-semibold">
            จำนวนคลิปวิดีโอ
          </h2>
          <h2 className="text-[#808080] text-[20px] font-semibold">9</h2>
        </div>
        <div className="flex justify-between w-1/2 min-w-fit">
          <h2 className="text-[#808080] text-[20px] font-semibold">
            จำนวนแบบฝึก
          </h2>
          <h2 className="text-[#808080] text-[20px] font-semibold">9</h2>
        </div>
        <div className="flex justify-between w-1/2 min-w-fit">
          <h2 className="text-[#808080] text-[20px] font-semibold">
            จำนวนไฟล์ที่ดาวน์โหลดได้
          </h2>
          <h2 className="text-[#808080] text-[20px] font-semibold">9</h2>
        </div>
      </div>
    </div>
  );
}

function checkReadyToPublish(
  courseBasicInfo: CourseBasicInfo,
  courseChapters: CourseChapter[],
  courseGoalsInfo: CourseGoalsInfo,
  coursePublishingInfo: CoursePublishingInfo,
) {
  return (
    courseBasicInfo !== undefined &&
    courseChapters.length > 0 &&
    courseGoalsInfo !== undefined &&
    coursePublishingInfo !== undefined
  );
}

function CreateCourse() {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<string>("content");
  const [courseBasicInfo, setCourseBasicInfo] = useState<
    CourseBasicInfo | undefined
  >(undefined);
  const [chapters, setChapters] = useState<CourseChapter[]>([]);
  const [courseGoalsInfo, setCourseGoalsInfo] = useState<
    CourseGoalsInfo | undefined
  >(undefined);
  const [coursePublishingInfo, setCoursePublishingInfo] = useState<
    CoursePublishingInfo | undefined
  >(undefined);

  const onCreateCourseBasicInfo = (basicInfo: CourseBasicInfo) => {
    setCourseBasicInfo(basicInfo);
    setCurrentTab("content");
  };
  const onCreateChapter = (chapter: CourseChapter) => {
    setChapters((prev) => [...prev, chapter]);
    setCurrentTab("content");
  };
  const onUpdateGoalsInfo = (goalsInfo: CourseGoalsInfo) => {
    setCourseGoalsInfo(goalsInfo);
  };
  const onUpdatePublishingInfo = (publishingInfo: CoursePublishingInfo) => {
    setCoursePublishingInfo(publishingInfo);
  };
  const onPublishCourse = () => {
    // TODO: Send the course to the server.
  };

  const fakeThumbnail =
    "https://miro.medium.com/v2/resize:fit:691/1*VSQ0XEywxSgZBwW05GsZtw.png";

  if (courseBasicInfo === undefined) {
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <CourseCreateStepper onSubmit={onCreateCourseBasicInfo} />
      </div>
    );
  }

  if (currentTab === "content")
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <_TopPanel
          courseBasicInfo={courseBasicInfo}
          courseThumbnailUrl={fakeThumbnail}
        />
        <div className="flex justify-start items-start space-x-10 w-full h-fit">
          <_SideNav
            currentTab="content"
            onChangeTab={setCurrentTab}
            onPublish={onPublishCourse}
            readyToPublish={checkReadyToPublish(
              courseBasicInfo,
              chapters,
              courseGoalsInfo,
              coursePublishingInfo,
            )}
          />
          <div className="flex flex-col justify-start space-y-5 w-full h-fit p-8 bg-white">
            {chapters.map((chapter, idx) => (
              <CourseChapterInfo
                key={idx}
                chapterName={chapter.chapterName}
                chapterDescription={chapter.chapterDescription}
                chapterNumber={idx + 1}
                lessons={chapter.lessons}
              />
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
  else if (currentTab == "goals")
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <_TopPanel
          courseBasicInfo={courseBasicInfo}
          courseThumbnailUrl={fakeThumbnail}
        />
        <div className="flex justify-start items-start space-x-10 w-full h-fit">
          <_SideNav
            currentTab="goals"
            onChangeTab={setCurrentTab}
            onPublish={onPublishCourse}
            readyToPublish={checkReadyToPublish(
              courseBasicInfo,
              chapters,
              courseGoalsInfo,
              coursePublishingInfo,
            )}
          />
          <CourseGoalsInfoForm
            onUpdate={onUpdateGoalsInfo}
            courseBasicInfo={courseBasicInfo}
          />
        </div>
      </div>
    );
  else if (currentTab == "publishing")
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <_TopPanel
          courseBasicInfo={courseBasicInfo}
          courseThumbnailUrl={fakeThumbnail}
        />
        <div className="flex justify-start items-start space-x-10 w-full h-fit">
          <_SideNav
            currentTab="publishing"
            onChangeTab={setCurrentTab}
            onPublish={onPublishCourse}
            readyToPublish={checkReadyToPublish(
              courseBasicInfo,
              chapters,
              courseGoalsInfo,
              coursePublishingInfo,
            )}
          />
          <CoursePublishingInfoForm
            onUpdate={onUpdatePublishingInfo}
            courseBasicInfo={courseBasicInfo}
          />
        </div>
      </div>
    );
  else if (currentTab == "add-chapter")
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <div className="w-full">
          <CourseChapterCreate
            chapterNumber={chapters.length + 1}
            onSubmit={onCreateChapter}
            onCancel={() => {
              setCurrentTab("content");
            }}
          />
        </div>
      </div>
    );
}

export default CreateCourse;
