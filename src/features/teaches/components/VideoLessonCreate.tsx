import { faPaperclip, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import VideoPlayer from "../../../components/VideoPlayer";
import { uploadFile } from "../../../services/uploader/file";
import { Lesson } from "../types/course";

function _Preview({ src, setDuration }: { src: string | undefined, setDuration: (duration) => void }) {
  if (src == undefined) {
    return (
      <div className="">
        <h1 className=" mx-[40px] mt-[20px] font-semibold text-[18px]">
          Preview
        </h1>
        <div className="ml-[50px] mt-[10px] p-5 my-auto bg-[#e0e0e0]">
          ยังไม่ได้เลือกไฟล์
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-[40px] my-[20px]">
        <h1 className="font-bold text-[18px]">
          Preview
        </h1>
        <VideoPlayer url={src} onGetDuration={setDuration} />
      </div>
    );
  }
}

interface VideoLessonCreateProps {
  defaultLesson?: Lesson;
  chapterNumber: number;
  chapterName: string;
  lessonNumber: number;
  onSubmit: (lesson: Lesson) => void;
  onCancel: () => void;
}

function VideoLessonCreate({
  chapterName,
  defaultLesson,
  chapterNumber,
  lessonNumber,
  onSubmit,
  onCancel,
}: VideoLessonCreateProps) {
  const [lessonName, setLessonName] = useState<string>("");
  const onLessonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLessonName(e.target.value);
  };
  const [fileSrc, setFileSrc] = useState<File | undefined>(undefined);
  const [urlSrc, setUrlSrc] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  useEffect(() => {
    if (defaultLesson != undefined) {
      setLessonName(defaultLesson.name);
      setUrlSrc(defaultLesson.videoUrl!);
    }
  }, [defaultLesson])
  const handleSubmit = () => {
    if (lessonName === "") {
      alert("กรุณาใส่ชื่อบทเรียน");
      return
    }
    if (fileSrc == undefined && urlSrc == "") {
      alert("กรุณาใส่ไฟล์");
      return
    }
    if (fileSrc != undefined) {
      const file = new File([fileSrc!], lessonName + ".mp4", { type: "video/mp4" });
      uploadFile(file)
        .then((url) => {
          const lesson: Lesson = {
            lessonId: defaultLesson?.lessonId || "",
            name: lessonName,
            number: lessonNumber,
            length: duration,
            type: "video",
            videoUrl: url,
          };
          onSubmit(lesson);
        })
        .catch((err) => {
          alert("ไม่สามารถอัพโหลดไฟล์ได้");
          console.log(err);
          return;
        })
    }
    else {
      const lesson: Lesson = {
        lessonId: defaultLesson?.lessonId || "",
        name: lessonName,
        number: lessonNumber,
        type: "video",
        length: duration,
        videoUrl: urlSrc,
      };
      onSubmit(lesson);
    }
  };
  return (
    <div className=" w-full h-screen">
      <div className="ml-[70px] mt-[20px] flex items-center">
        <h1 className="text-black text-[24px] font-bold">
          บทที่ {chapterNumber} :{" "}
        </h1>
        <h2 className=" text-[#808080] text-[18px] font-semibold ml-4">
          {chapterName} / วิดีโอที่ {lessonNumber}
        </h2>
      </div>
      <div className="ml-[70px] mr-[100px] mt-[30px] flex grow items-center bg-white drop-shadow-xl pt-4 pb-4">
        <h1 className="my-auto mx-[40px] font-semibold text-[18px]">
          ชื่อวิดีโอ
        </h1>
        <input
          type="text"
          className="mr-[50px] min-w-0 grow input input-bordered"
          value={lessonName}
          onChange={onLessonNameChange}
        />
      </div>
      <div className=" ml-[70px] mr-[100px] flex flex-col grow bg-white drop-shadow-xl pt-2 pb-4 mt-5">
        <h1 className="my-auto mx-[40px] mt-[20px] font-semibold text-[18px]">
          วิดีโอ
        </h1>
        <div className="flex">
          <dialog id="url_form_modal" className="modal">
            <div className="modal-box">
              <h1 className="font-semibold text-[16px] text-[#808080]">ลิ้งค์</h1>
              <input type="text" value={urlSrc} onChange={(e) => setUrlSrc(e.target.value)}
                className="input input-bordered mt-2" />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn" onClick={() => {
                    setUrlSrc(urlSrc);
                    setFileSrc(undefined);
                  }}>ตกลง</button>
                </form>
              </div>
            </div>
          </dialog>
          <button
            className="mx-[40px] mt-[20px]"
            onClick={() => { (document.getElementById('url_form_modal') as HTMLDialogElement).showModal() }}
          >
            <FontAwesomeIcon
              icon={faPaperclip}
              color="#606060"
              size="xl"
              className=" border-[#e0e0e0] border-2 p-2 rounded-full"
            />
            <h1 className=" mt-[5px] font-semibold text-[16px] text-[#808080]">
              ลิ้งค์
            </h1>
          </button>
          <h1 className=" self-center font-semibold text-[16px] text-[#505050]">
            หรือ
          </h1>
          <div className="mx-[10px] mt-[20px] flex flex-col">
            <input
              type="file"
              id="lessonFileSelector"
              style={{ display: "none" }}
              onChange={(e) => {
                setFileSrc(e.target.files![0]);
                setUrlSrc("");
              }}
            />
            <button
              className=""
              onClick={() =>
                document.getElementById("lessonFileSelector").click()
              }
            >
              <FontAwesomeIcon
                icon={faUpload}
                color="#606060"
                size="xl"
                className=" border-[#e0e0e0] border-2 p-2 rounded-full"
              />
            </button>
            <h1 className=" mt-[5px] font-semibold text-[16px] text-[#808080]">
              อัพโหลดไฟล์
            </h1>
          </div>
        </div>
      </div>
      <div className="ml-[70px] mr-[100px] flex grow  bg-white drop-shadow-xl pt-2 pb-4 mt-5">
        <_Preview src={fileSrc != undefined ? URL.createObjectURL(fileSrc) : urlSrc} setDuration={(duration) => { setDuration(duration) }} />
      </div>
      <div className="flex mt-[40px] justify-end mr-[100px] w-full">
        <button className="btn bg-black text-white" onClick={handleSubmit}>
          บันทึก
        </button>
        <button className="btn ml-7 mr-[100px]" onClick={onCancel}>
          ยกเลิก
        </button>
      </div>
    </div>
  );
}

export default VideoLessonCreate;
