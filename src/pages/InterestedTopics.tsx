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
      className={`rounded-full px-5 h-[40px] hover:shadow-lg ${
        isSelected
          ? "bg-white border-black border-[2px]"
          : "bg-[#EAEAEA] border-transparent border-[2px]"
      }`}
      onClick={handleTopicClick}
    >
      <div className="flex flex-row items-center">
        <div
          className={`text-center text-[20px] ${
            isSelected
              ? "text-black font-semibold"
              : "text-gray-600 font-normal"
          }`}
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
  for (let i = 0; i < 40; i++) {
    allTopics.push({
      id: `${i}`,
      name: `Topic ${"a".repeat(i % 10)} `,
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

  const navigate = useNavigate();
  function handleNextClick() {
    if (interestedTopicIds.length < 3) {
      alert("กรุณาเลือก 3 หัวข้อหรือมากกว่า");
      return;
    }
    // TODO: Send interestedTopicIds to backend.
    console.log(interestedTopicIds);
    navigate("/home");
  }

  return (
    <div className="bg-white absolute top-0 bottom-0">
      <div className="mt-8 text-[36px] text-black font-semibold text-center">
        คุณสนใจด้านใดบ้าง
      </div>

      <div className="mt-4 text-[20px] text-black text-center">
        เลือก 3 หัวข้อหรือมากกว่า
      </div>

      <div className="mx-60 mt-14 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none] [scrollbar-width:'none']">
        <div className="flex flex-row flex-wrap justify-center">
          {allTopics.map((topic) => (
            <div className="m-3" key={topic.id}>
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
        <button
          className={`${
            interestedTopicIds.length < 3 ? "hidden" : "block"
          } rounded-full bg-[#D9D9D9] px-6 h-[40px] absolute bottom-10 hover:shadow-lg`}
          onClick={handleNextClick}
        >
          <div className="text-black text-center text-[24px] font-semibold">
            ลุยกันเลย
          </div>
        </button>
      </div>
    </div>
  );
}

export default InterestedTopics;
