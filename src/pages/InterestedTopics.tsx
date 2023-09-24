import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Topic } from "../features/stores/types/topic";

interface SingleTopicSelectorProps {
  topicId: string;
  topicName: string;
  onClick: (topicId: string) => void;
}

function SingleTopicSelector(props: SingleTopicSelectorProps) {
  const [isSelected, setIsSelected] = useState(false);
  function handleTopicClick() {
    setIsSelected(!isSelected);
    props.onClick(props.topicId);
  }

  return (
    <button
      className={
        isSelected
          ? "group rounded-full bg-white border-black border-[2px] px-6 h-[40px] hover:shadow-lg"
          : "group rounded-full bg-[#EAEAEA] px-6 h-[40px] hover:shadow-lg"
      }
      onClick={handleTopicClick}
    >
      <div className="flex flex-row items-center">
        <div
          className={
            isSelected
              ? "text-black text-center text-[20px] font-semibold"
              : "text-gray-600 text-center text-[20px] font-normal"
          }
        >
          {props.topicName}
        </div>
        <div className="ml-3">
          <FontAwesomeIcon
            icon={isSelected ? faCheck : faPlus}
            size="lg"
            color={isSelected ? "black" : "gray"}
          />
        </div>
      </div>
    </button>
  );
}

function InterestedTopics() {
  // TODO: Fetch all topics from backend.
  const allTopics: Topic[] = [];
  for (let i = 0; i < 50; i++) {
    allTopics.push({
      id: `${i}`,
      name: `Topic ${i}`,
    });
  }

  const [interestedTopicIds, setInterestedTopicIds] = useState<string[]>([]);
  function handleTopicClick(topicId: string) {
    if (interestedTopicIds.includes(topicId)) {
      setInterestedTopicIds(interestedTopicIds.filter((id) => id !== topicId));
    } else {
      setInterestedTopicIds([...interestedTopicIds, topicId]);
    }
  }

  const [isExpanded, setIsExpanded] = useState(false);
  function handleExpandClick() {
    setIsExpanded(!isExpanded);
  }

  const navigate = useNavigate();
  function handleNextClick() {
    // TODO: Send interestedTopicIds to backend.
    console.log(interestedTopicIds);
    navigate("/home");
  }

  return (
    <>
      <div className=" mt-10 text-[36px] font-semibold text-center">
        คุณสนใจด้านใดบ้าง
      </div>

      <div className="mt-4 mb-12 text-[20px] text-center">
        เลือก 3 หัวข้อหรือมากกว่า
      </div>

      <div className="flex flex-row justify-center">
        <div className="flex flex-row flex-wrap">
          {allTopics.map((topic) => (
            <div className="m-2" key={topic.id}>
              <SingleTopicSelector
                topicId={topic.id}
                topicName={topic.name}
                onClick={handleTopicClick}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <button>
          <div
            className="text-black text-center text-[20px] font-semibold"
            onClick={handleExpandClick}
          >
            เพิ่มเติม
          </div>
        </button>
      </div>

      <div className="flex flex-row justify-center">
        <button
          className="rounded-full bg-[#D9D9D9] px-6 h-[40px] hover:shadow-lg"
          onClick={handleNextClick}
        >
          <div className="text-black text-center text-[24px] font-semibold">
            ลุยกันเลย
          </div>
        </button>
      </div>
    </>
  );
}

export default InterestedTopics;
