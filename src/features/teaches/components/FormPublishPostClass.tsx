import { faPaperclip, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getFileNameFromSrc } from "../../../utils/functions";
import { useUser } from "../../../hooks/useUser";
    
export function FormPublishPostClass(
    profileTeacher : string,
) {
  const [isActionCreatePost, setIsActionCreatePost] = useState(false);
  const [textDetailForm, setTextDetailForm] = useState("");
  //const [fileUpLoad, setFileUpLoad] = useState<File | null>(null);
  const [upLoadLink, setUpLoadLink] = useState("");
  const [isClickUploadLink, setIsClickUploadLink] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [attachments, setAttachments] = useState<
    {
      attachmentType: string;
      src: string;
    }[]
  >([]);

  function getFileNameFromUrl(url: string): string {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const lastSlashIndex = pathname.lastIndexOf("/");
    const fileName = pathname.substring(lastSlashIndex + 1);
    return fileName;
  }

  const handleClickCreatePost = () => {
    setIsActionCreatePost(!isActionCreatePost);
  };

  const addNewPost = () => {
    alert("add new post");
  };

  const handdleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  const handleClickUploadFile = () => {
    setIsClickUploadLink(!isClickUploadLink);
  }

  const handleClickUploadLink = () => {
    setIsClickUploadLink(!isClickUploadLink);
  }

  const handleUploadLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setUpLoadLink(link);
  }
    
   


  const addNewAttachment = () => {
    const linkType = getFileNameFromSrc(upLoadLink);
    setAttachments([
        ...attachments,
        { attachmentType: linkType, src: upLoadLink }
    ])
    setIsClickUploadLink(false);
    setUpLoadLink("");
  }

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    alert(fileList);

  }

  const classNameButtonOk = textDetailForm ? "btn w-24 text-sm mx-2" : "w-24 text-sm mx-2 opacity-50 font-semibold";

  const Modal = ({ children } : { children: React.ReactNode; }) => {
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




  const renderAttachments = () => {
    return (

        attachments.map((argument) => {
            return (
                <div className="flex w-4/5 bg-white h-24 mb-4 items-center justify-center border-[#808080] border-2">
                    <div className="w-1/5 flex items-center justify-center h-full border-r-2 border-[#808080]">
                        <p className="font-bold text-xs">preview</p>
                    </div>
                    <div className="w-4/5 flex flex-col justify-center items-start ml-8 h-full overflow-hidden mx-8">
                        <p className="text-sm w-full text-start semibold truncate">{argument.src}</p>
                        <p className="text-sm w-full text-start truncate">{argument.attachmentType}</p>
                    </div>
                </div>
            )
        })
    );
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

            {renderAttachments()}

            { isClickUploadLink ? (
                <Modal>
                    <label htmlFor="" className="py-2">กำหนดชื่อ</label>
                    <input
                        className="form-input border-2 w-full h-10 pb-1" 
                        type="text" name="" id="" />
                    <label htmlFor="" className="py-2">เพิ่มลิ้ง</label>
                    <input
                        onChange={handleUploadLinkChange}
                        className="form-input border-2 w-full h-10 mb-4"
                        type="text" />

                    <div className="flex items-end justify-end w-full">
                        <button
                            onClick={() => setIsClickUploadLink(!isClickUploadLink)}
                            className="btn text-sm w-24  mx-2"
                            >
                            close
                        </button>
                        <button
                            onClick={addNewAttachment}
                            className="btn  w-24 text-sm mx-2"
                        >
                            
                            ok
                        </button>
                    </div>
                </Modal>
            ) : null }

            <div className="flex w-11/12 justify-between">
              <div className="">
                <input
                    type="file"
                    id="attachments"
                    onChange={handleAttachmentChange}
                    className="hidden"
                />
                <button 
                    onClick={handleClickUploadLink} 
                    className="btn rounded-full mr-4">
                        
                    <FontAwesomeIcon icon={ faUpload } size="lg"></FontAwesomeIcon>
                </button>
                <button
                    onClick={handleClickUploadLink} 
                    className="btn rounded-full">
                    <FontAwesomeIcon icon={ faPaperclip} size="lg"></FontAwesomeIcon>
                </button>
              </div>

              <div className="">
                <button
                    onClick={handleClickCreatePost} 
                    className="btn w-20 mx-2 bg-white border-2 text-[#808080]">
                  ยกเลิก
                </button>
                <button 
                    onClick={addNewPost} 
                    className={classNameButtonOk}>
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
          className="flex w-[720px] items-center bg-[#f1f1f1] drop-shadow-lg py-4 px-6 rounded-md"
        >
          <div className="w-10 h-10 rounded-full drop-shadow-none shadow-none">
            <img src="" alt="" className="w-10 h-10 rounded-full shadow-none drop-shadow-none bg-black" />
          </div>
          <p className="text-[#808080] ml-4">ประกาศบางสิ่งในชั้นเรียน</p>
        </button>
      )}
    </div>
  );
}
