import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

function NewCourseCard() {
  return (
    <div className="card w-[249px] h-[304px] bg-base-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] hover:shadow-xl cursor-pointer">
      <div className="flex flex-col items-center justify-center h-full">
        <FontAwesomeIcon icon={faPlus} className="text-[90px]" />
        <div className="pt-9 text-[18px] font-bold">สร้างคอร์สเรียนใหม่</div>
      </div>
    </div>
  );
}

export default NewCourseCard