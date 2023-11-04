import { useNavigate, useParams } from "react-router-dom";
import ClassHomeworkDetailMainContent from "../../features/teaches/components/ClassHomeworkDetailMainContent";
import { useUser } from "../../hooks/useUser";
import { HomeworkDetail } from "../../features/teaches/types/homework";
import useHomework from "../../features/teaches/hooks/useHomework";

interface _TopNavbarProps {
  homework: HomeworkDetail;
}

function _TopNavbar({ homework }: _TopNavbarProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-4 p-5 border-b-2">
      <button
        className="text-black text-[32px] font-bold hover:opacity-80"
        onClick={() => navigate("/teach/classes")}
      >
        {"คลาสเรียน"}
      </button>
      <h1 className="text-black text-[32px] font-bold">{">"}</h1>
      <button
        className="text-black text-[32px] font-bold ml-2 hover:opacity-80"
        onClick={() => navigate(`/teach/classes/${homework.classId}`)}
      >
        {homework.clsName}
      </button>
      <h1 className="text-black text-[32px] font-bold">{">"}</h1>
      <button className="text-black text-[32px] font-bold ml-2 hover:opacity-80">
        {homework.name}
      </button>
    </div>
  );
}

type PathParams = {
  [key: string]: string;
  classId: string;
  homeworkId: string;
};

function LearningHomeworkDetail() {
  const { classId, homeworkId } = useParams<PathParams>();
  const { user } = useUser();
  const { homework, addReply } = useHomework(user, classId, homeworkId);

  return (
    <div className="w-full h-full bg-[#eeeeee80] overflow-auto">
      {user && homework && (
        <>
          <_TopNavbar homework={homework} />
          <div className="flex p-5 mt-5 justify-center items-start space-x-5 w-full">
            <div className="min-w-[410px] max-w-[770px] w-full">
              <ClassHomeworkDetailMainContent
                user={user}
                homework={homework}
                onAddReply={addReply}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LearningHomeworkDetail;
