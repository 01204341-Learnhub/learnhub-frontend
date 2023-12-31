import { useParams } from "react-router-dom";
import { LearnhubUser } from "../../types/user";
import useClass from "../../features/learns/hooks/useClass";
import { Class } from "../../features/learns/types/classes";
import ClassAnnouncementThread from "../../features/learns/components/ClassAnnouncementThread";
import ClassHomeworkThread from "../../features/learns/components/ClassHomeworkThread";
import { useState } from "react";
import ClassHomeworkListEntry from "../../features/learns/components/ClassHomeworkListEntry.tsx";
import ClassPeopleListEntry from "../../features/learns/components/ClassPeopleListEntry.tsx";
import { useUser } from "../../hooks/useUser.ts";

interface _TabSwitcherProps {
  currentTab: "main" | "homeworks" | "people";
  onTabChange?: (tab: "main" | "homeworks" | "people") => void;
}

function _TabSwitcher({ currentTab, onTabChange }: _TabSwitcherProps) {
  return (
    <div className="flex px-3 space-x-5 border-b-[3px] border-[#E0E0E0]">
      <button
        className={`text-black text-[20px] font-bold px-3 pt-3 pb-2 border-b-[10px] ${
          currentTab === "main" ? "border-black" : "border-transparent"
        }`}
        onClick={() => onTabChange("main")}
      >
        หน้าหลักชั้นเรียน
      </button>
      <button
        className={`text-black text-[20px] font-bold px-3 pt-3 pb-2 border-b-[10px] ${
          currentTab === "homeworks" ? "border-black" : "border-transparent"
        }`}
        onClick={() => onTabChange("homeworks")}
      >
        งานในชั้นเรียน
      </button>
      <button
        className={`text-black text-[20px] font-bold px-3 pt-3 pb-2 border-b-[10px] ${
          currentTab === "people" ? "border-black" : "border-transparent"
        }`}
        onClick={() => onTabChange("people")}
      >
        คนในชั้นเรียน
      </button>
    </div>
  );
}

interface _MainTabProps {
  user: LearnhubUser;
  cls: Class;
}

function _MainTab({ user, cls }: _MainTabProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-full min-w-[600px] max-w-[950px] space-y-5 items-center">
        <h1 className="text-black text-[32px] font-bold self-start">
          {cls.name}
        </h1>
        <img
          src={cls.thumbnailUrl}
          alt={`https://picsum.photos/seed/${cls.classId}/1920/1080`}
          className="w-full h-[315px] object-cover border-[1px] border-[#a0a0a080] rounded-[10px]"
        />
        <div className="flex flex-col w-full space-y-3">
          {cls.simpleThreads
            .sort((a, b) => b.lastEdit.getTime() - a.lastEdit.getTime())
            .map((simpleThread) => {
              if (simpleThread.typ === "announcement") {
                return (
                  <ClassAnnouncementThread
                    key={simpleThread.threadId}
                    user={user}
                    classId={cls.classId}
                    threadId={simpleThread.threadId}
                  />
                );
              }
              if (simpleThread.typ === "homework") {
                return (
                  <ClassHomeworkThread
                    key={simpleThread.threadId}
                    teacherFullName={cls.teacher.fullname}
                    classId={cls.classId}
                    simpleThread={simpleThread}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

interface _HomeworksTabProps {
  cls: Class;
}

function _HomeworksTab({ cls }: _HomeworksTabProps) {
  const [topics] = useState<string[]>(
    Array.from(
      new Set(
        cls.simpleThreads
          .filter((simpleThread) => simpleThread.typ === "homework")
          .map((simpleThread) => simpleThread.homeworkTopicName)
          .sort()
      )
    )
  );
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col bg-white w-full min-w-[600px] max-w-[950px] p-5 space-y-5 ">
        {topics.map((topic) => (
          <div key={topic}>
            <h1 className="text-black text-[32px] font-bold p-5 mb-2 border-b-[5px]">
              {topic ?? "ไม่มีหัวข้อ"}
            </h1>
            <div className="flex flex-col space-y-2">
              {cls.simpleThreads
                .filter(
                  (simpleThread) =>
                    simpleThread.typ === "homework" &&
                    simpleThread.homeworkTopicName === topic
                )
                .sort((a, b) => b.lastEdit.getTime() - a.lastEdit.getTime())
                .map((simpleThread) => (
                  <ClassHomeworkListEntry
                    key={simpleThread.threadId}
                    classId={cls.classId}
                    simpleThread={simpleThread}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface _PeopleTabProps {
  cls: Class;
}

function _PeopleTab({ cls }: _PeopleTabProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-full min-w-[600px] max-w-[950px] p-5 space-y-10 ">
        <div>
          <h1 className="text-black text-[32px] font-bold mb-4">ผู้สอน</h1>
          <ClassPeopleListEntry user={cls.teacher} />
        </div>
        <div>
          <h1 className="text-black text-[32px] font-bold mb-4">ผู้เรียน</h1>
          <div className="flex flex-col space-y-2">
            {cls.students
              .sort((a, b) => a.fullname.localeCompare(b.fullname))
              .map((student) => (
                <ClassPeopleListEntry key={student.userID} user={student} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type PathParams = {
  [key: string]: string;
  classId: string;
};

function LearningClass() {
  const { classId } = useParams<PathParams>();
  const [currentTab, setCurrentTab] = useState<"main" | "homeworks" | "people">(
    "main"
  );
  // const user = generateMockUser("student", "student0");
  const { user } = useUser();
  const { cls } = useClass(classId);
  return (
    <div className="bg-[#F6F6F6] w-full h-full">
      {user && cls && (
        <>
          <_TabSwitcher
            currentTab={currentTab}
            onTabChange={(tab) => setCurrentTab(tab)}
          />
          <div className="p-5 w-full">
            {(() => {
              if (currentTab === "main") {
                return <_MainTab user={user} cls={cls} />;
              }
              if (currentTab === "homeworks") {
                return <_HomeworksTab cls={cls} />;
              }
              if (currentTab === "people") {
                return <_PeopleTab cls={cls} />;
              }
              alert("Invalid tab, redirecting to main tab");
              return <_MainTab user={user} cls={cls} />;
            })()}
          </div>
        </>
      )}
    </div>
  );
}

export default LearningClass;
