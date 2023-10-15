import {
  faPaperclip,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getFileNameFromSrc } from "../../../utils/functions";
import { uploadImageFile } from "../../../services/uploader/image";
import Swal from "sweetalert2";

export function FormPublishPostClass(props: { profileTeacher: string }) {
  const { profileTeacher } = props;
  const [isActionCreatePost, setIsActionCreatePost] = useState(false);
  const [textDetailForm, setTextDetailForm] = useState("");
  //const [fileUpLoad, setFileUpLoad] = useState<File | null>(null);
  const [upLoadLink, setUpLoadLink] = useState("");
  const [isClickUploadLink, setIsClickUploadLink] = useState(false);
  const [attachments, setAttachments] = useState<
    {
      attachmentType: string;
      src: string;
    }[]
  >([]);

  function getFileType(file: File): string {
    const imageTypes = ["image/jpeg", "image/png", "image/gif"];
    const videoTypes = ["video/mp4", "video/avi", "video/quicktime", "video/x-ms-wmv"];
    if (imageTypes.includes(file.type)) {
      return "image";
    } else if (videoTypes.includes(file.type)) {
      return "video";
    } else {
      return "file";
    }
  }

  function getLinkType(link: string): string {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    if (link.includes("youtube.com/watch?v=")) {
        console.log("video");
        
      return "video";
    } else if (imageExtensions.some((ext) => link.endsWith(ext))) {
        console.log("image");
        
      return "image";
    } else {
        console.log("file");
      return "file";
    }
  }

  const handleClickCreatePost = () => {
    setIsActionCreatePost(!isActionCreatePost);
  };

  const addNewPost = () => {
    alert("add new post");
  };

  const handleClickUploadLink = () => {
    setIsClickUploadLink(!isClickUploadLink);
  };

  const handleUploadLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setUpLoadLink(link);
  };

const handelUploadFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
) => {
    const fileList = e.target.files;
    const firstFile = fileList[0];
    let url = "";
    Swal.fire({
        title: "กำลังอัพโหลดไฟล์",
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    url = await uploadImageFile(firstFile);
    const file = fileList[0];
    console.log(getFileType(file));
    
    setAttachments([
        ...attachments,
        { attachmentType: getFileType(file), src: url },
    ]);
    Swal.close();
    Swal.fire({
        icon: "success",
        title: "อัพโหลดไฟล์สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
    })
};

  const addNewAttachment = () => {
    const linkType = getLinkType(upLoadLink);
    console.log(linkType);
    
    setAttachments([
      ...attachments,
      { attachmentType: linkType, src: upLoadLink },
    ]);
    setIsClickUploadLink(false);
    setUpLoadLink("");
  };

  const handleDeleteAttachment = (index: number) => {
    const newAttachments = attachments.filter((attachment, i) => i !== index);
    newAttachments.slice(index, 1);
    setAttachments(newAttachments);
    Swal.fire({
        icon: "success",
        title: "ลบไฟล์สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
    })
  };


  const classNameButtonOk = textDetailForm
    ? "btn w-24 text-sm mx-2"
    : "w-24 text-sm mx-2 opacity-50 font-semibold";

  const Modal = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-6 pb-4 pt-5">
                <div className="mt-3 text-center flex flex-col items-start">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPreview = (typeFile : string, src: string) => {
    if (typeFile === "image") {
        return (
            <div className="w-1/5 flex items-center justify-center h-full border-r-2">
                <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
        )
    } else if (typeFile === "video") {
        return (
            <div className="w-1/5 flex items-center justify-center h-full border-r-2">
                <video src={src} className="w-full h-full object-cover" />
            </div>
        )
    } else if (typeFile === "file") {
        return (
            <div className="w-1/5 flex items-center justify-center h-full border-r-2">
                <img src="https://img.icons8.com/ios/50/000000/file.png" alt="" className="w-full h-full object-scale-down" />
            </div>
        )
    }
  }

  const renderAttachments = () => {
    return attachments.map((argument, index) => {
      return (
        <div key={index} className="flex w-full items-center justify-center">
            <div className="flex w-4/5 bg-white h-24 mb-2 items-center justify-center border-2">
            {renderPreview(argument.attachmentType, argument.src)}
            <div className="w-4/5 flex flex-col justify-center items-start ml-8 h-full overflow-hidden mx-8">
                <p className="text-sm w-full text-start semibold truncate">
                {argument.src}
                </p>
                <p className="text-sm w-full text-start truncate">
                {argument.attachmentType}
                </p>
            </div>
            </div>
            <button
            onClick={() => handleDeleteAttachment(index)}
            className="ml-4"
        >
            <FontAwesomeIcon icon={faTimes} size="lg"></FontAwesomeIcon>
        </button>
        </div>
      );
    });
  };

  return (
    <div>
      {isActionCreatePost ? (
        <>
          <div className="flex flex-col items-center w-[720px] bg-white py-4 border-2 rounded-md">
            <div className="bg-white p-4 w-11/12 mb-4">
              <textarea
                onChange={(e) => setTextDetailForm(e.target.value)}
                placeholder="ประกาศบางสิ่งในชั้นเรียน"
                className="resize-none border-b-4 px-6 py-3 border-b-black bg-slate-100 h-40 w-full outline-none"
              />
            </div>

            <div className="w-full flex flex-col items-center">
              {renderAttachments()}
            </div>

            {isClickUploadLink ? (
              <Modal>
                <label htmlFor="" className="py-2">
                  กำหนดชื่อ
                </label>
                <input
                  className="form-input border-2 w-full h-10 pb-1"
                  type="text"
                  name=""
                  id=""
                />
                <label htmlFor="" className="py-2">
                  เพิ่มลิ้ง
                </label>
                <input
                  onChange={handleUploadLinkChange}
                  className="form-input border-2 w-full h-10 mb-4"
                  type="text"
                />

                <div className="flex items-end justify-end w-full">
                  <button
                    onClick={() => setIsClickUploadLink(!isClickUploadLink)}
                    className="btn text-sm w-24  mx-2"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={addNewAttachment}
                    className="btn  w-24 text-sm mx-2"
                  >
                    เพิ่ม
                  </button>
                </div>
              </Modal>
            ) : null}

            <div className="flex w-11/12 justify-between">
              <div className="">
                <label
                  htmlFor="attachments"
                  className="btn rounded-full mr-4 ml-4"
                >
                  <div className="relative mt-1">
                    <FontAwesomeIcon
                      icon={faUpload}
                      size="lg"
                    ></FontAwesomeIcon>
                    <input
                      type="file"
                      id="attachments"
                      onChange={handelUploadFileChange}
                      className="hidden"
                    />
                  </div>
                </label>
                <button
                  onClick={handleClickUploadLink}
                  className="btn rounded-full"
                >
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    size="lg"
                  ></FontAwesomeIcon>
                </button>
              </div>

              <div className="">
                <button
                  onClick={handleClickCreatePost}
                  className="btn w-20 mx-2 bg-white border-2 text-[#808080]"
                >
                  ยกเลิก
                </button>
                <button onClick={addNewPost} className={classNameButtonOk}>
                  โพสต์
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={handleClickCreatePost}
          type="button"
          className="flex w-[720px] items-center bg-[#f4f4f4] border-2 drop-shadow-lg py-4 px-6 rounded-md"
        >
          <div className="w-10 h-10 rounded-full drop-shadow-none shadow-none">
            <img
              src={profileTeacher}
              alt=""
              className="w-10 h-10 rounded-full shadow-none drop-shadow-none bg-black"
            />
          </div>
          <p className="text-[#808080] ml-4">ประกาศบางสิ่งในชั้นเรียน</p>
        </button>
      )}
    </div>
  );
}
