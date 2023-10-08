import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomeworkSubmissionFile, Thread } from "../types/thread";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const _mediaTypeText = (homeworkSubmissionFile: HomeworkSubmissionFile) => {
  const extension = homeworkSubmissionFile.src.split(".").pop();
  switch (extension) {
    case "zip":
      return "ไฟล์บีบอัด";
    case "txt":
      return "ไฟล์ข้อความ";
    case "pdf":
      return "ไฟล์ PDF";
    case "docx":
    case "doc":
      return "ไฟล์ Word";
    case "pptx":
    case "ppt":
      return "ไฟล์ PowerPoint";
    case "xlsx":
    case "xls":
      return "ไฟล์ Excel";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "tiff":
    case "tif":
    case "ico":
    case "svg":
    case "webp":
      return "ไฟล์รูปภาพ";
    case "avi":
    case "mov":
    case "mp4":
    case "wmv":
    case "webm":
      return "ไฟล์วิดีโอ";
    case "mp3":
    case "wav":
      return "ไฟล์เสียง";
    default:
      return "ไฟล์อื่นๆ";
  }
};

interface _FileEntryProps {
  homeworkSubmitted: boolean;
  homeworkSubmissionFile: HomeworkSubmissionFile;
  onRemoveHomeworkSubmissionFile: (homeworkFileId: string) => void;
}

function _FileEntry({
  homeworkSubmitted,
  homeworkSubmissionFile,
  onRemoveHomeworkSubmissionFile,
}: _FileEntryProps) {
  const handleHomeworkSubmissionFilePreview = (
    homeworkSubmissionFile: HomeworkSubmissionFile
  ) => {
    // TODO: Preview file
    alert(`Preview file: ${homeworkSubmissionFile.name}`);
  };
  const handleRemoveHomeworkSubmissionFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onRemoveHomeworkSubmissionFile(
      homeworkSubmissionFile.homeworkSubmissionFileId
    );
  };
  return (
    <div
      className="group flex items-center space-x-3 h-[60px] bg-white rounded-[6px] border-[1px] border-[#DADCE0] hover:shadow-md cursor-pointer"
      onClick={() => {
        handleHomeworkSubmissionFilePreview(homeworkSubmissionFile);
      }}
    >
      <img
        // TODO: Change to real thumbnail
        src={`https://robohash.org/${homeworkSubmissionFile.homeworkSubmissionFileId}?set=set4`}
        alt="File Thumbnail"
        className="h-full aspect-square rounded-l-[5px] object-cover border-r-[1px] border-[#DADCE0]"
      />
      <div className="w-1/2">
        <p className="text-[#707070] group-hover:text-black text-[16px] font-semibold truncate">
          {homeworkSubmissionFile.name}
        </p>
        <p className="text-[#808080] text-[16px] font-normal">
          {_mediaTypeText(homeworkSubmissionFile)}
        </p>
      </div>
      <div className={!homeworkSubmitted ? "block" : "hidden"}>
        <button
          className={`justify-self-end rounded-full bg-white min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] hover:bg-[#F9F9F9]`}
          onClick={handleRemoveHomeworkSubmissionFile}
        >
          <FontAwesomeIcon icon={faXmark} color="#8c8a8e" size="lg" />
        </button>
      </div>
    </div>
  );
}
interface FileUploaderProps {
  thread: Thread;
  onAddHomeworkSubmissionFile: (name: string, src: string) => void;
  onRemoveHomeworkSubmissionFile: (homeworkFileId: string) => void;
  onSubmitHomework: () => void;
  onUnsubmitHomework: () => void;
}

function FileUploader({
  thread,
  onAddHomeworkSubmissionFile,
  onRemoveHomeworkSubmissionFile,
  onSubmitHomework,
  onUnsubmitHomework,
}: FileUploaderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleHomeworkSubmissionFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // TODO: Upload file
    const file = e.target.files?.item(0);
    if (file) {
      onAddHomeworkSubmissionFile(file.name, URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col space-y-4 bg-white rounded-[10px] p-5 drop-shadow-md">
      <div className="flex justify-between items-start">
        <p className="text-black text-[20px] font-[500]">งานของคุณ</p>
        <div className="flex flex-col items-end space-y-3">
          <p className="text-[#808080] text-[16px] font-semibold">
            {thread.homeworkSubmitted ? "ส่งแล้ว" : "ยังไม่ได้ส่ง"}
          </p>
          <p className="text-[#707070] text-[14px] font-normal">
            {thread.homeworkLastSubmissionDateTime
              ? `(ส่งล่าสุด ${thread.homeworkLastSubmissionDateTime.toLocaleString(
                  "th-TH",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )})`
              : ""}
          </p>
        </div>
      </div>
      <div
        className={
          thread.homeworkSubmissionFiles.length > 0 ? "block" : "hidden"
        }
      >
        <div className="flex flex-col space-y-2">
          {thread.homeworkSubmissionFiles.map((homeworkSubmissionFile) => (
            <_FileEntry
              key={homeworkSubmissionFile.homeworkSubmissionFileId}
              homeworkSubmitted={thread.homeworkSubmitted}
              homeworkSubmissionFile={homeworkSubmissionFile}
              onRemoveHomeworkSubmissionFile={onRemoveHomeworkSubmissionFile}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className={!thread.homeworkSubmitted ? "block" : "hidden"}>
          <button className="h-[40px] w-full bg-white rounded-[6px] border-[1px] border-[#DADCE0] hover:drop-shadow-md">
            <p className="text-[#606060] text-[18px] font-[500]">เพิ่มไฟล์</p>
          </button>
        </div>
        <button
          className="h-[40px] w-full rounded-[6px] border-[1px] bg-black hover:drop-shadow-md hover:opacity-80"
          onClick={() => {
            if (thread.homeworkSubmitted) {
              onUnsubmitHomework();
            } else {
              onSubmitHomework();
            }
          }}
        >
          <p className="text-white text-[18px] font-[500]">
            {thread.homeworkSubmitted ? "ถอนการส่งงาน" : "ส่งงาน"}
          </p>
        </button>
      </div>
    </div>
  );
}

export default FileUploader;
