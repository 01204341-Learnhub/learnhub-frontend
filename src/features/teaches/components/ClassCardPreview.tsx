interface ClassCardPreviewProps {
  classThumbnailUrl: string;
  className: string;
  instructorName: string;
  price: number;
  category: string;
  level: string;
}

function ClassCardPreview(props: ClassCardPreviewProps) {
  return (
    <div className="bg-white w-[286px] h-[350px] rounded-[20px] drop-shadow-lg cursor-pointer hover:drop-shadow-xl overflow-hidden">
      <img
        className="object-cover w-full h-[161px] rounded-t-[20px]"
        src={props.classThumbnailUrl}
        alt="Class Thumbnail"
      />
      <div className="p-4 w-full">
        <h1 className="text-black text-[16px] font-semibold">
          {props.className}
        </h1>
        <p className="text-[#808080] text-[14px] font-semibold mt-1">
          {props.instructorName}
        </p>
        <p className="text-black text-[18px] font-semibold mt-5">
          {props.price} บาท
        </p>
        <div className="flex justify-between items-center mt-5 w-full">
          <div className="bg-[#FF8989] flex justify-center items-center px-3 py-2 text-black text-[13px] font-semibold text-center">
            {props.category}
          </div>
          <div className="flex items-center space-x-2">
            <img
              className="w-[30px] h-[25px]"
              src="https://gcdnb.pbrd.co/images/G0C0jeTiZxkL.png?o=1"
              alt="lvl"
            ></img>
            <div className="text-[#808080] text-[14px] font-semibold">
              {props.level}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassCardPreview;
