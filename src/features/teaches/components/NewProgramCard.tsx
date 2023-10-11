import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NewProgramCardProps {
  type: string,
  onClick: () => void
}

function NewProgramClass({ type, onClick }: NewProgramCardProps) {
  return (
    <div className="card w-[249px] h-[304px] bg-base-200 drop-shadow-lg mt-5 rounded-[20px] hover:shadow-xl cursor-pointer"
      onClick={onClick}>
      <div className="flex flex-col items-center justify-center h-full">
        <FontAwesomeIcon icon={faPlus} className="text-[90px]" />
        <div className="pt-9 text-[18px] font-bold">สร้าง{type}เรียนใหม่</div>
      </div>
    </div>
  );
}

export default NewProgramClass