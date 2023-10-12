import { ClassContext } from "../../../pages/teachers/CreateClass.tsx";
import React, { useContext, useRef } from "react";
import { availableCategories } from "../types/class.ts";
import { uploadFile } from "../../../services/uploader/file.ts";

function _Name() {
  const classContext = useContext(ClassContext);
  const onUpdateName = (name: string) => {
    const updatedClass = { ...classContext.cls };
    updatedClass.name = name;
    classContext.setCls(updatedClass);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        ชื่อคลาสเรียนของคุณ
      </h2>
      <input
        className="border-2 border-[#C0C0C0] py-2 px-3 w-[90%]"
        type="text"
        placeholder="ชื่อคลาสเรียน"
        value={classContext.cls.name}
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

function _Description() {
  const classContext = useContext(ClassContext);
  const onUpdateDescription = (description: string) => {
    const updatedClass = { ...classContext.cls };
    updatedClass.description = description;
    classContext.setCls(updatedClass);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        คำอธิบายคลาสเรียนของคุณ
      </h2>
      <textarea
        className="border-2 border-[#C0C0C0] py-2 px-3 w-[90%]"
        placeholder="คำอธิบายคลาสเรียน"
        value={classContext.cls.description}
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
          {classContext.cls.description.length}
        </p>
      </div>
    </div>
  );
}

function _Thumbnail() {
  const classContext = useContext(ClassContext);
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
    const updatedClass = { ...classContext.cls };
    updatedClass.thumbnailUrl = thumbnailUrl;
    classContext.setCls(updatedClass);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        ภาพคลาสเรียนของคุณ
      </h2>
      <div className="flex justify-start items-stretch space-x-10 w-full">
        <div className="flex-shrink-0 bg-gray-200 w-[300px] h-[169px]">
          <img
            className="w-[300px] h-[169px] object-cover"
            src={classContext.cls.thumbnailUrl}
            alt="thumbnail"
          />
        </div>
        <div className="flex flex-col justify-start items-start space-y-3 w-full">
          <div className="flex justify-start w-full">
            <input
              className="border-2 border-[#C0C0C0] py-2 px-3 w-3/5"
              type="text"
              placeholder="ใส่ URL ของภาพ หรืออัพโหลด"
              value={classContext.cls.thumbnailUrl}
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
              {classContext.cls.thumbnailUrl === "" ? "อัพโหลด" : "เปลี่ยน"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function _Price() {
  const classContext = useContext(ClassContext);
  const onUpdatePrice = (price: number) => {
    const updatedClass = { ...classContext.cls };
    updatedClass.price = price;
    classContext.setCls(updatedClass);
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
        value={classContext.cls.price}
        onChange={(e) => {
          onUpdatePrice(parseInt(e.target.value));
        }}
      />
    </div>
  );
}

function _Category() {
  const classContext = useContext(ClassContext);
  const onUpdateCategoryId = (categoryId: string) => {
    const updatedClass = { ...classContext.cls };
    updatedClass.categoryId = categoryId;
    classContext.setCls(updatedClass);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">กำหนดหมวดหมู่</h2>
      <p className="text-[16px] text-black">
        โปรดเลือกหมวดหมู่สำหรับคลาสเรียนของคุณ
      </p>
      <select
        value={classContext.cls.categoryId}
        onChange={(e) => {
          onUpdateCategoryId(e.target.value);
        }}
        className="border-2 border-[#C0C0C0] py-2 px-3 w-fit"
      >
        <option value="" disabled selected>
          เลือกหมวดหมู่
        </option>
        {availableCategories.map((category) => {
          return <option value={category.categoryId}>{category.name}</option>;
        })}
      </select>
    </div>
  );
}

function ClassPublishingInfoForm() {
  return (
    <div className="flex flex-col justify-start items-start space-y-10 bg-white p-8 w-full">
      <h1 className="text-[32px] font-semibold text-black w-full pb-4 border-b-2">
        เผยแพร่คลาส
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
      <_Name />
      <_Description />
      <_Thumbnail />
      <_Price />
      <_Category />
    </div>
  );
}

export default ClassPublishingInfoForm;
