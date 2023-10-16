import React, { useRef } from "react";
import { uploadFile } from "../../../services/uploader/file.js";
import { useTags } from "../hooks/useTags.js";
import { Course } from "../types/course.js";
import { Tag } from "../types/tags.js";

function _Name({ course, setCourse }: { course: Course, setCourse: (course: Course) => void }) {
  const onUpdateName = (name: string) => {
    const updatedCourse = { ...course };
    updatedCourse.name = name;
    setCourse(updatedCourse);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        ชื่อคอร์สเรียนของคุณ
      </h2>
      <input
        className="border-2 border-[#C0C0C0] py-2 px-3 w-[90%]"
        type="text"
        placeholder="ชื่อคอร์สเรียน"
        value={course.name}
        onChange={(e) => {
          onUpdateName(e.target.value);
        }}
      />
      <p className="text-[#606060] text-[14px] font-semibold w-[90%]">
        ชื่อหลักสูตรของคุณควรเป็นการผสมผสานระหว่างการดึงดูดความสนใจ มีข้อมูล
        และเหมาะสำหรับการค้นหา
      </p>
    </div>
  );
}

function _Description({ course, setCourse }: { course: Course, setCourse: (course: Course) => void }) {
  const onUpdateDescription = (description: string) => {
    const updatedCourse = { ...course };
    updatedCourse.description = description;
    setCourse(updatedCourse);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        คำอธิบายคอร์สเรียนของคุณ
      </h2>
      <textarea
        className="border-2 border-[#C0C0C0] py-2 px-3 w-[90%]"
        placeholder="คำอธิบายคอร์สเรียน"
        value={course.description}
        rows={8}
        onChange={(e) => {
          onUpdateDescription(e.target.value);
        }}
      />
      <div className="flex flex-row justify-between items-center w-[90%]">
        <p className="text-[#606060] text-[14px] font-semibold w-full">
          คำอธิบายควรยาวอย่างน้อย 200 คำ
        </p>
        <p className="text-[#606060] text-[16px] font-semibold">
          {course.description.length}
        </p>
      </div>
    </div>
  );
}

function _Thumbnail({ course, setCourse }: { course: Course, setCourse: (course: Course) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      uploadFile(file)
        .then((src) => {
          onUpdateThumbnailUrl(src);
        })
        .catch((err) => {
          console.log(err);
          alert("Upload failed");
        });
    }
  };
  const onUpdateThumbnailUrl = (thumbnailUrl: string) => {
    const updatedCourse = { ...course };
    updatedCourse.thumbnailUrl = thumbnailUrl;
    setCourse(updatedCourse);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        ภาพคอร์สเรียนของคุณ
      </h2>
      <div className="flex justify-start items-stretch space-x-10 w-full">
        <div className="flex-shrink-0 bg-gray-200 w-[300px] h-[169px]">
          <img
            className="w-[300px] h-[169px] object-cover"
            src={course.thumbnailUrl}
            alt="thumbnail"
          />
        </div>
        <div className="flex flex-col justify-start items-start space-y-3 w-full">
          <div className="flex justify-start w-full">
            <input
              className="border-2 border-[#C0C0C0] py-2 px-3 w-3/5"
              type="text"
              placeholder="ใส่ URL ของภาพ หรืออัพโหลด"
              value={course.thumbnailUrl}
              onChange={(e) => {
                onUpdateThumbnailUrl(e.target.value);
              }}
            />
            <input
              type="file"
              ref={fileRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              className="bg-black text-white py-2 px-3"
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              {course.thumbnailUrl === "" ? "อัพโหลด" : "เปลี่ยน"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function _Price({ course, setCourse }: { course: Course, setCourse: (course: Course) => void }) {
  const onUpdatePrice = (price: number) => {
    const updatedCourse = { ...course };
    updatedCourse.price = price;
    setCourse(updatedCourse);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">กำหนดราคา</h2>
      <p className="text-[16px] text-black">
        โปรดกรอกราคา (บาท) สำหรับหลักสูตรของคุณด้านล่าง
      </p>

      <input
        className="border-2 border-[#C0C0C0] py-2 px-3 w-1/10"
        type="number"
        min="0"
        placeholder="ราคา"
        value={course.price}
        onChange={(e) => {
          onUpdatePrice(parseInt(e.target.value));
        }}
      />
    </div>
  );
}

function _Category({ course, setCourse }: { course: Course, setCourse: (course: Course) => void }) {
  const { tags: availableTags } = useTags();
  const onUpdateTag = (tag: Tag) => {
    const updatedCourse = { ...course };
    updatedCourse.tag = tag;
    setCourse(updatedCourse);
  };
  const tagIDtoName = (tagID: string) => {
    for (const tag of availableTags) {
      if (tag.tagID === tagID) {
        return tag.name;
      }
    }
    throw new Error("Tag not found");
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">กำหนดหมวดหมู่</h2>
      <p className="text-[16px] text-black">
        โปรดเลือกหมวดหมู่สำหรับคลาสเรียนของคุณ
      </p>
      <select
        value={course.tag.tagID}
        onChange={(e) => {
          onUpdateTag({
            tagID: e.target.value,
            name: tagIDtoName(e.target.value),
          });
        }}
        className="border-2 border-[#C0C0C0] py-2 px-3 w-fit"
      >
        <option value="" disabled selected>
          เลือกหมวดหมู่
        </option>
        {availableTags.map((tag) => {
          return <option value={tag.tagID}>{tag.name}</option>;
        })}
      </select>
    </div>
  );
}

function CourseUpdatingInfoForm({ course, setCourse }: { course: Course, setCourse: (course: Course) => void }) {
  return (
    <div className="flex flex-col justify-start items-start space-y-10 bg-white p-8 w-full">
      <h1 className="text-[32px] font-semibold text-black w-full pb-4 border-b-2">
        เผยแพร่คอร์ส
      </h1>
      <div className="flex flex-col justify-start items-start space-y-3 w-full">
        <h2 className="text-black text-[18px] font-semibold">
          หน้าเริ่มต้นของหลักสูตร
        </h2>
        <p className="text-[16px] w-full">
          คำอธิบายต่อไปนี้จะปรากฏต่อสาธารณะในหน้าเริ่มต้นของหลักสูตร
          และจะมีผลโดยตรงต่อประสิทธิภาพหลักสูตรของคุณ
          คำอธิบายเหล่านี้จะช่วยให้ผู้เรียนตัดสินใจว่าหลักสูตรของคุณเหมาะกับพวกเขาหรือไม่
        </p>
      </div>
      <_Name course={course} setCourse={setCourse} />
      <_Description course={course} setCourse={setCourse} />
      <_Thumbnail course={course} setCourse={setCourse} />
      <_Price course={course} setCourse={setCourse} />
      <_Category course={course} setCourse={setCourse} />
    </div>
  );
}

export default CourseUpdatingInfoForm;
