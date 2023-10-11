import { useParams } from "react-router-dom";
import { useState } from "react";
import CourseAnnouncementDropdown from "../../features/learns/components/CourseAnnouncementDropdown";
import { addAnnouncement } from "../../features/stores/services/courseAnnouncements";
import Swal from "sweetalert2";
import { uploadFile } from "../../services/uploader/file";
import { uploadImageFile } from "../../services/uploader/image";
import { useAnnouncementsCourses } from "../../features/stores/hooks/useListAnnouncementsCourses";



function TeacherCourseManage() {
  const { id } = useParams();
  //const [isAddNewPost, setIsAddNewPost] = useState<boolean>(false);
  const {announcements, isFetching} = useAnnouncementsCourses(id);
  const [isClickAdd, setIsClickAdd] = useState<boolean>(false);
  const [nameAnc, setNameAnc] = useState<string>("");
  const [textAnc, setTextAnc] = useState<string>("");
  const [isClickAddLink, setIsClickAddLink] = useState<boolean>(false);
  const [linkAttach, setLinkAttach] = useState<string>("");
  const [attachments, setAttachments] = useState<{
    attachmentType: string;
    src: string;
  }[]>([]);


  const changeTextAnc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAnc(e.target.value);
  };

  const changeNameAnc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameAnc(e.target.value);
  };

  const handleClickAddLink = () => {
    setIsClickAddLink(true);
  };

  const handleCancleAddLink = () => {
    setIsClickAddLink(false);
  };

  const handleAttachmentLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkAttach(event.target.value);
    setAttachments([...attachments, { attachmentType: "file", src: linkAttach }]);
  };

  const handleAttachmentChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = event.target.files;
    if (fileList && fileList.length == 1) {

      let url = "";
      const isImage = fileList[0].type.includes("image");
      if (isImage) {
        url = await uploadImageFile(fileList[0]);
      } else {
        url = await uploadFile(fileList[0]);
      }
      setAttachments([...attachments, { attachmentType: "file", src: url }]);
      //setIsAddNewPost(true);

    } else {
        alert("กรุณาเลือกไฟล์เพียง 1 ไฟล์");
    }
  };

  const addNewAnnouncement = async () => {
    if (nameAnc == "" || textAnc == "") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบ",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    
    addAnnouncement(id!, nameAnc, textAnc, attachments)
      .then((announcementId) => {
        console.log(announcementId);
        Swal.fire({
          icon: "success",
          title: "สร้างประกาศสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
    setIsClickAdd(false);
  };

  const AddAnnouncementModal = () => {
    return (
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-6 pb-4 pt-5">
                <div className="mt-3 text-center flex flex-col items-start">
                  <h3
                    className="text-base font-semibold leading-6 self-center text-gray-900"
                    id="modal-title"
                  >
                    สร้างประกาศ
                  </h3>
                  <label
                    htmlFor="nameAnc"
                    className="font-semibold text-sm pt-2 pb-1 pl-1"
                  >
                    หัวข้อ
                  </label>
                  <input
                    onChange={changeNameAnc}
                    placeholder="หัวข้อประกาศ"
                    className="form-input mt-1 block w-full py-2 px-3 h-10 outline-none bg-[#F9F9FA]"
                    id="nameAnc"
                    name="nameAnc"
                    type="text"
                  />
                  <label
                    htmlFor="textAnc"
                    className="font-semibold text-sm pt-2 pb-1 pl-1"
                  >
                    เนื้อหาประกาศ
                  </label>
                  <textarea
                    onChange={changeTextAnc}
                    placeholder="เนื้อหาประกาศ"
                    className="form-textarea mt-1 block w-full py-2 px-3 h-44 outline-none resize-none bg-[#F9F9FA]"
                    name="textAnc"
                    id="textAnc"
                  />
                </div>

                {attachments.length != 0 ? (
                  <>
                    {attachments.map((attach, index) => {
                      return (
                        <div
                          key={index} 
                          className="w-full mt-4 h-16 border-2 flex">
                          <div className="w-1/5 border-r-2">
                            <img
                              src={attach.src}
                              alt=""
                              className=" object-cover w-full h-full"
                            />
                          </div>
                          <div className="w-4/5 flex items-center pl-4">
                            <h1 className="text-xs text-[#606060]">
                              {attach.src}
                            </h1>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse justify-between items-center sm:px-6">
                <div className="flex flex-row-reverse">
                  <button
                    onClick={addNewAnnouncement}
                    type="button"
                    className="inline-flex mx-2 w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    โพสประกาศ
                  </button>
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    ยกเลิก
                  </button>
                </div>
                <div className="">
                  <label
                    htmlFor="attachments"
                    className="text-xs font-bold mx-2"
                  >
                    select File
                  </label>
                  <input
                    type="file"
                    id="attachments"
                    onChange={handleAttachmentChange}
                    className="hidden"
                  />

                  <button
                    onClick={handleClickAddLink}
                    className="text-xs font-bold mx-2"
                  >
                    Add Link
                  </button>
                  {isClickAddLink ? (
                    <div className="bg-white border-2 relative z-10">
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                      <div className="fixed flex items-center justify-center inset-0 z-10 w-full overflow-y-auto">
                        <div className="bg-white px-6 w-4/5 pt-8 pb-4">
                          <input
                            onChange={handleAttachmentLinkChange}
                            placeholder="Link"
                            className="form-input mt-1 block w-full py-2 px-3 h-10 outline-none bg-[#F9F9FA]"
                            id="linkAttach"
                            name="linkAttach"
                            type="text"
                          />
                          <div className="flex justify-end">
                            <button
                              onClick={handleCancleAddLink}
                              type="button"
                              className="text-sm font-bold mx-1 mt-4"
                            >
                              ยกเลิก
                            </button>
                            <button
                              onClick={handleCancleAddLink}
                              type="button"
                              className="text-sm font-bold mx-2 mt-4"
                            >
                              เพิ่ม
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleAddAnnouncement = () => {
    setIsClickAdd(true);
  };

  const handleCloseModal = () => {
    console.log("close modal");
    setIsClickAdd(false);
  };

  const renderAnnouncements = () => {
    if (isFetching) {
        return <div>loading...</div>
    }
    return (
      <>
        {announcements.map((announcement, index) => (
          <div key={index}>
            <CourseAnnouncementDropdown {...announcement} />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="w-full bg-purple-100">
      <div className="flex m-6 items-center py-4">
        <h1 className="font-bold text-2xl">คอร์สเรียนของฉัน</h1>
        <h2 className="rounded-full font-semibold px-2 py-1 bg-[#FF9B9B] ml-5">
          course
        </h2>
      </div>
      <h1 className="font-semibold text-xl m-6 py-4">Course Name Resirdute</h1>
      <main className="flex w-full h-full">
        <section className="basis-1/3 bg-emerald-100 flex flex-col items-center">
          <div className="w-72 h-40 bg-black flex flex-col items-center justify-center">
            <p className="text-white text-center">Image</p>
            <img src="" alt="" className=" object-cover" />
          </div>
          <div className="w-72 h-40 bg-white drop-shadow-lg"></div>
        </section>
        <section className="flex flex-col items-center basis-2/3">
          <div className="flex w-[720px] pt-4 pb-2 justify-between">
            <h1 className="text-lg font-semibold">โพสต์ที่ประกาศในคอร์สนี้</h1>
            <button
              onClick={handleAddAnnouncement}
              className="font-semibold px-2 py-1 ml-5"
            >
              + สร้างโพสต์
            </button>
          </div>
          {isClickAdd && AddAnnouncementModal()}
          <div>
            {renderAnnouncements()}
          </div>
        </section>
      </main>
    </div>
  );
}

export default TeacherCourseManage;
