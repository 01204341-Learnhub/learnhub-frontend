import { Tag } from "../types/tags";

interface CourseCardPreviewProps {
  courseThumbnailUrl: string;
  courseName: string;
  instructorName: string;
  price: number;
  tag: Tag;
  level: string;
}

function CourseCardPreview({
  courseThumbnailUrl,
  courseName,
  instructorName,
  price,
  tag,
  level,
}: CourseCardPreviewProps) {
  return (
    <div className="m-2 rounded-[20px] w-[286px] h-[350px] max-w-sm overflow-hidden shadow-lg bg-white">
      <div className=" w-[286px] h-[146px]">
        <img
          className="w-full h-[146px] object-cover"
          src={courseThumbnailUrl}
          alt="Larm On Chang"
        />
      </div>
      <div className="px-5 py-5">
        <div className="-mt-3 font-extrabold text-[16px] mb-2">
          {courseName}
        </div>
        <p className="-mt-2 font-bold text-gray-500 text-[14px]">
          {instructorName}
        </p>
        <p className="mb-5 text-[18px] font-bold">{price} บาท</p>
        <div className="my-1 flex justify-between items-center">
          <h1 className="bg-[#FF8989] h-[34px] font-semibold text-black text-[13px] flex items-center justify-center">
            {tag.name}
          </h1>
          <div className="flex items-center ">
            <img
              className="w-[30px] h-[25px]"
              src="https://gcdnb.pbrd.co/images/G0C0jeTiZxkL.png?o=1"
              alt="lvl"
            ></img>
            <div className="  p-2 font-semibold text-[14px] text-gray-500 text-center ">
              {level}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCardPreview