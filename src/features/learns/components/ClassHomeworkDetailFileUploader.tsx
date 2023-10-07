import { Thread } from "../types/thread";

interface FileUploaderProps {
  thread: Thread;
  onAddHomeworkSubmissionFile: (name: string, src: string) => void;
  onRemoveHomeworkSubmissionFile: (homeworkFileId: string) => void;
}

function FileUploader({
  thread,
  onAddHomeworkSubmissionFile,
  onRemoveHomeworkSubmissionFile,
}: FileUploaderProps) {
  thread;
  onAddHomeworkSubmissionFile;
  onRemoveHomeworkSubmissionFile;
  return <div className="bg-red-200">hello</div>;
}

export default FileUploader;
