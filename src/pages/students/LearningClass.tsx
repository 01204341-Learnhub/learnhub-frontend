import { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { LearnhubUser } from "../../types/user";
import { generateMockUser } from "../../features/learns/types/thread";
import useClass from "../../features/learns/hooks/useClass";
import { Class } from "../../features/learns/types/classes";
import ClassAnnouncementThread from "../../features/learns/components/ClassAnnouncementThread";
import ClassHomeworkThread from "../../features/learns/components/ClassHomeworkThread";

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
  cls: Class;
}

function _MainTab({ cls }: _MainTabProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col w-full min-w-[600px] max-w-[1000px] space-y-5 items-center">
        <h1 className="text-black text-[32px] font-bold self-start">
          {cls.name}
        </h1>
        <img
          src={cls.thumbnailUrl}
          alt={`https://picsum.photos/seed/${cls.classId}/1920/1080`}
          className="w-full h-[315px] object-cover"
        />
        <div className="flex flex-col w-[85%] space-y-3">
          {cls.simpleThreads.map((simpleThread) => {
            if (simpleThread.typ === "announcement") {
              return (
                <ClassAnnouncementThread
                  key={simpleThread.threadId}
                  simpleThread={simpleThread}
                />
              );
            }
            if (simpleThread.typ === "homework") {
              return (
                <ClassHomeworkThread
                  key={simpleThread.threadId}
                  teacher={cls.teacher}
                  simpleThread={simpleThread}
                  classId={cls.classId}
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
  cls;
  return <div>homeworks</div>;
}

interface _PeopleTabProps {
  cls: Class;
}

function _PeopleTab({ cls }: _PeopleTabProps) {
  cls;
  return <div>people</div>;
}

type PathParams = {
  [key: string]: string;
  classId: string;
};

const UserContext = createContext<LearnhubUser | undefined>(undefined);

function LearningClass() {
  const { classId } = useParams<PathParams>();
  const [currentTab, setCurrentTab] = useState<"main" | "homeworks" | "people">(
    "main"
  );
  // TODO: use useUser hook
  const user = generateMockUser("student", "student0");
  const { cls } = useClass(classId);
  return (
    <div className="bg-[#F6F6F6] w-full h-full">
      {user && cls && (
        <UserContext.Provider value={user}>
          <_TabSwitcher
            currentTab={currentTab}
            onTabChange={(tab) => setCurrentTab(tab)}
          />
          <div className="p-5 w-full">
            {(() => {
              if (currentTab === "main") {
                return <_MainTab cls={cls} />;
              }
              if (currentTab === "homeworks") {
                return <_HomeworksTab cls={cls} />;
              }
              if (currentTab === "people") {
                return <_PeopleTab cls={cls} />;
              }
              alert("Invalid tab, redirecting to main tab");
              return <_MainTab cls={cls} />;
            })()}
          </div>
        </UserContext.Provider>
      )}
    </div>
  );
}
export default LearningClass;
