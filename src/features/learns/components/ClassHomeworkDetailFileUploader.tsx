import { Thread } from "../types/thread";

interface FileUploaderProps {
  thread: Thread;
  onAddHomeworkFile: (name: string, src: string) => void;
  onRemoveHomeworkFile: (homeworkFileId: string) => void;
}

function FileUploader({
  thread,
  onAddHomeworkFile,
  onRemoveHomeworkFile,
}: FileUploaderProps) {
  thread;
  onAddHomeworkFile;
  onRemoveHomeworkFile;
  return <div className="bg-red-200">hello</div>;
}

export default FileUploader;
