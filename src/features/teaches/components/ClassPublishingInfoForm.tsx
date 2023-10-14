import { CreatingClassContext } from "../../../pages/teachers/CreateClass.tsx";
import React, { useContext, useEffect, useRef } from "react";
import { Tag } from "../types/tags.ts";
import { uploadFile } from "../../../services/uploader/file.ts";
import { listTags } from "../services/tags.ts";

function _Name() {
  const creatingClassContext = useContext(CreatingClassContext);
  const handleUpdateName = (name: string) => {
    const updatedClass = { ...creatingClassContext.cls };
    updatedClass.name = name;
    creatingClassContext.setCls(updatedClass);
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
        value={creatingClassContext.cls.name}
        onChange={(e) => {
          handleUpdateName(e.target.value);
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
  const creatingClassContext = useContext(CreatingClassContext);
  const handleUpdateDescription = (description: string) => {
    const updatedClass = { ...creatingClassContext.cls };
    updatedClass.description = description;
    creatingClassContext.setCls(updatedClass);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        คำอธิบายคลาสเรียนของคุณ
      </h2>
      <textarea
        className="border-2 border-[#C0C0C0] py-2 px-3 w-[90%]"
        placeholder="คำอธิบายคลาสเรียน"
        value={creatingClassContext.cls.description}
        rows={8}
        onChange={(e) => {
          handleUpdateDescription(e.target.value);
        }}
      />
      <div className="flex flex-row justify-between items-center w-[90%]">
        <p className="text-[#606060] text-[14px] font-semibold w-full">
          คำอธิบายควรยาวอย่างน้อย 200 คำ
        </p>
        <p className="text-[#606060] text-[16px] font-semibold">
          {creatingClassContext.cls.description.length}
        </p>
      </div>
    </div>
  );
}

function _Picture() {
  const creatingClassContext = useContext(CreatingClassContext);
  const handleUpdatePictureUrl = (src: string) => {
    const updatedClass = { ...creatingClassContext.cls };
    updatedClass.pictureUrl = src;
    creatingClassContext.setCls(updatedClass);
  };
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      uploadFile(file)
        .then((src) => {
          handleUpdatePictureUrl(src);
        })
        .catch((err) => {
          console.log(err);
          alert("Upload failed");
        });
    }
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
            src={creatingClassContext.cls.pictureUrl}
            alt="Picture"
          />
        </div>
        <div className="flex flex-col justify-start items-start space-y-3 w-full">
          <div className="flex justify-start w-full">
            <input
              className="border-2 border-[#C0C0C0] py-2 px-3 w-3/5"
              type="text"
              placeholder="ใส่ URL ของภาพ หรืออัพโหลด"
              value={creatingClassContext.cls.pictureUrl}
              onChange={(e) => {
                handleUpdatePictureUrl(e.target.value);
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
              {creatingClassContext.cls.pictureUrl === ""
                ? "อัพโหลด"
                : "เปลี่ยน"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function _Price() {
  const creatingClassContext = useContext(CreatingClassContext);
  const handleUpdatePrice = (price: number) => {
    const updatedClass = { ...creatingClassContext.cls };
    updatedClass.price = price;
    creatingClassContext.setCls(updatedClass);
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
        min={0}
        placeholder="ราคา"
        value={creatingClassContext.cls.price}
        onChange={(e) => {
          handleUpdatePrice(parseInt(e.target.value));
        }}
      />
    </div>
  );
}

function _Tag() {
  const creatingClassContext = useContext(CreatingClassContext);
  const [availableTags, setAvailableTags] = React.useState<Tag[]>([]);
  useEffect(() => {
    listTags()
      .then((tags) => {
        setAvailableTags(tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleUpdateTag = (tagId: string) => {
    const updatedClass = { ...creatingClassContext.cls };
    updatedClass.tag = availableTags.find((tag) => tag.tagID === tagId);
    creatingClassContext.setCls(updatedClass);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">กำหนดหมวดหมู่</h2>
      <p className="text-[16px] text-black">
        โปรดเลือกหมวดหมู่สำหรับคลาสเรียนของคุณ
      </p>
      <select
        value={
          creatingClassContext.cls.tag ? creatingClassContext.cls.tag.tagID : ""
        }
        onChange={(e) => {
          handleUpdateTag(e.target.value);
        }}
        className="border-2 border-[#C0C0C0] py-2 px-3 w-fit"
      >
        <option value="" disabled>
          เลือกหมวดหมู่
        </option>
        {availableTags.map((tag) => {
          return (
            <option key={tag.tagID} value={tag.tagID}>
              {tag.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function _MaxStudent() {
  const creatingClassContext = useContext(CreatingClassContext);
  const handleUpdateMaxStudent = (maxStudent: number) => {
    const updatedClass = { ...creatingClassContext.cls };
    updatedClass.maxStudent = maxStudent;
    creatingClassContext.setCls(updatedClass);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        จำกัดจำนวนผู้เรียน
      </h2>
      <p className="text-black text-[16px]">
        โปรดระบุจำนวนจำกัดของผู้เรียนที่สามารถลงทะเบียนเรียนในชั้นเรียนของคุณ
        เพื่อที่คุณจะได้สามารถจัดการกับชั้นเรียนของคุณได้อย่างมีประสิทธิภาพ
      </p>
      <p className="text-black text-[14px] font-bold">
        *การกำหนดจำนวนผู้เรียนในชั้นเรียน
        อาจส่งผลต่อข้อมูลการตัดสินใจของผู้เรียนได้
      </p>
      <select
        value={creatingClassContext.cls.maxStudent}
        onChange={(e) => {
          handleUpdateMaxStudent(parseInt(e.target.value));
        }}
        className="border-2 border-[#C0C0C0] py-2 px-3 w-fit"
      >
        <option value={0} disabled>
          0
        </option>
        {[10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100].map(
          (maxStudent, index) => {
            return (
              <option key={index} value={maxStudent}>
                {maxStudent}
              </option>
            );
          }
        )}
      </select>
      <p className="text-[#606060] text-[14px] font-semibold">
        แนะนำว่าไม่ควรเกิน 40 คน ถ้าคุณมีชั้นเรียนมากกว่า 1
      </p>
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
      <_Picture />
      <_Price />
      <_Tag />
      <_MaxStudent />
    </div>
  );
}

export default ClassPublishingInfoForm;
