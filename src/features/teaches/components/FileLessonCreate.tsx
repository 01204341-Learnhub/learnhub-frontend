import { faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Lesson } from "../types/course";

interface VideoLessonCreateProps {
  defaultLesson?: Lesson;
  chapterNumber: number;
  chapterName: string;
  lessonNumber: number;
  onSubmit: (lesson: Lesson) => void;
  onCancel: () => void;
}

function FileLessonCreate({
  defaultLesson,
  chapterName,
  chapterNumber,
  lessonNumber,
  onSubmit,
  onCancel,
}: VideoLessonCreateProps) {
  const [lessonName, setLessonName] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const onRemoveFile = (index: number) => {
    setFiles((p) => p.filter((_, i) => i != index));
  };
  const onLessonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLessonName(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    for (let i = 0; i < fileList.length; i++) {
      setFiles((p) => [...p, fileList.item(i)]);
    }
  };
  const handleSubmit = () => {
    if (lessonName == "") {
      alert("กรุณาใส่ชื่อบทเรียน");
      return;
    }
    else if (files.length == 0) {
      alert("กรุณาเลือกไฟล์");
      return;
    }
    const lesson: Lesson = {
      lessonId: "1234567890",
      name: lessonName,
      number: lessonNumber,
      type: "files",
      length: 60 * 10,
      fileUrl: files[0].name,
    };
    onSubmit(lesson);
  };
  useEffect(() => {
    if (defaultLesson) {
      setLessonName(defaultLesson.name)
      setFiles([new File([], defaultLesson.fileUrl!)])
    }
  }, [defaultLesson])

  return (
    <div className="w-full">
      <div className="ml-[70px] mt-[20px] flex items-center">
        <h1 className="text-black text-[24px] font-bold">
          บทที่ {chapterNumber} :{" "}
        </h1>
        <h2 className=" text-[#808080] text-[18px] font-semibold ml-4">
          {chapterName} / ไฟล์
        </h2>
      </div>
      <div className="ml-[70px] mr-[100px] mt-[30px] bg-white drop-shadow-xl">
        <div className="  flex grow items-center pt-2 pb-4">
          <h1 className="my-auto mx-[40px] font-semibold text-[18px]">
            ชื่อไฟล์
          </h1>
          <input
            type="text"
            className="mr-[50px] min-w-0 grow input input-bordered"
            value={lessonName}
            onChange={onLessonNameChange}
          />
        </div>
      </div>

      <div className="ml-[70px] mr-[100px] mt-[30px] bg-white drop-shadow-xl">
        <ol>
          {files.map((file, index) => (
            <li key={index}>
              <div className=" ml-[40px] mr-[100px] mt-[20px] flex bg-white drop-shadow-xl">
                <h1 className=" ml-[40px] mr-[50px] my-[20px] grow font-semibold text-[#808080] text-[18px]">
                  {file.name}
                </h1>
                <FontAwesomeIcon
                  icon={faX}
                  color="#606060"
                  className=" mx-[40px] my-auto"
                  onClick={() => onRemoveFile(index)}
                />
              </div>
            </li>
          ))}
        </ol>
        <input
          type="file"
          id="lessonFileSelector"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {files.length == 0 ? <button
          className="btn mx-[40px] my-[20px] text-[#808080]"
          onClick={() => {
            document.getElementById("lessonFileSelector").click();
          }}
        >
          <FontAwesomeIcon
            icon={faUpload}
            color="#606060"
            size="xl"
            className=" border-[#e0e0e0] border-2 p-2 rounded-full"
          />
          เพิ่มไฟล์
        </button> : <></>}
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

export default FileLessonCreate;
