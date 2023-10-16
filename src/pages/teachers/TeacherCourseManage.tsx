import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseAnnouncementDropdown from "../../features/learns/components/CourseAnnouncementDropdown";
import {
  addAnnouncement,
  getAnnouncement,
} from "../../features/stores/services/courseAnnouncements";
import Swal from "sweetalert2";
import { uploadFile } from "../../services/uploader/file";
import { uploadImageFile } from "../../services/uploader/image";
import { useAnnouncementsCourses } from "../../features/stores/hooks/useListAnnouncementsCourses";
import { useCourseDetail } from "../../features/stores/hooks/useCourseDetail";
import { CourseAnnouncement } from "../../features/stores/types/courseAnnouncements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faFile,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function getFileType(file: File): string {
  const imageTypes = ["image/jpeg", "image/png", "image/gif"];
  const videoTypes = [
    "video/mp4",
    "video/avi",
    "video/quicktime",
    "video/x-ms-wmv",
  ];
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
  const videoExtensions = [".mp4", ".avi", ".mov", ".wmv"];
  if (link.includes("youtube.com/watch?v=")) {
    return "video";
  } else if (link.includes("1drv.ms") || link.includes("drive.google.com")) {
    const extension = link.substring(link.lastIndexOf("."));
    if (videoExtensions.includes(extension)) {
      return "video";
    } else {
      return "file";
    }
  } else if (imageExtensions.some((ext) => link.endsWith(ext))) {
    return "image";
  } else {
    return "file";
  }
}

function TeacherCourseManage() {
  const { id } = useParams();
  const { courseDetail, isFetching: isFetchingCourseDetail } =
    useCourseDetail(id);
  const { announcements, isFetching } = useAnnouncementsCourses(id);
  const [announcementsData, setAnnouncementData] = useState<
    CourseAnnouncement[]
  >([]);
  const [isClickAdd, setIsClickAdd] = useState<boolean>(false);
  const [nameAnc, setNameAnc] = useState<string>("");
  const [textAnc, setTextAnc] = useState<string>("");
  const [isClickAddLink, setIsClickAddLink] = useState<boolean>(false);
  const [linkAttach, setLinkAttach] = useState<string>("");

  const [attachments, setAttachments] = useState<
    {
      attachmentType: string;
      src: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchAnnouncements() {
      if (!isFetching) {
        setAnnouncementData(announcements);
      }
    }
    fetchAnnouncements();
  }, [isFetching, announcements]);

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

  const handleAddLink = () => {
    const attachmentType = getLinkType(linkAttach);
    console.log(attachmentType);
    
    setAttachments([
      ...attachments,
      { attachmentType: attachmentType, src: linkAttach },
    ]);
    setIsClickAddLink(false);
  };

  const handleAttachmentLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLinkAttach = event.target.value;
    setLinkAttach(newLinkAttach);
  };

  const handleAttachmentChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = event.target.files;
    if (fileList && fileList.length == 1) {
      Swal.fire({
        title: "กำลังอัพโหลดไฟล์",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      let url = "";
      if (getFileType(fileList[0]) == "image") {
        url = await uploadImageFile(fileList[0]);
      } else {
        url = await uploadFile(fileList[0]);
      }
      console.log(getFileType(fileList[0]));
      
      setAttachments([
        ...attachments,
        { attachmentType: getFileType(fileList[0]), src: url },
      ]);
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "อัพโหลดไฟล์สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      alert("กรุณาเลือกไฟล์เพียง 1 ไฟล์");
    }
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
    });
  };

  const addNewAnnouncement = async (): Promise<string> => {
    if (nameAnc == "" || textAnc == "") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบ",
        showConfirmButton: false,
        timer: 1500,
      });
      return "";
    }

    addAnnouncement(id!, nameAnc, textAnc, attachments)
      .then(async (announcementId) => {
        Swal.fire({
          icon: "success",
          title: "สร้างประกาศสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        const addNewAnnouncement = await getAnnouncement(id!, announcementId);
        setAnnouncementData([...announcementsData, addNewAnnouncement]);
        return announcementId;
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
        return "-1";
      });
    setIsClickAdd(false);
  };

  const renderPreviewAttachments = (type: string, src: string) => {
    if (type == "image") {
      return <img src={src} alt="" className=" object-cover w-full h-full" />;
    } else if (type == "video") {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <FontAwesomeIcon icon={faCirclePlay} color="#808080" size="xl" />
        </div>
      );
    } else if (type == "file") {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <FontAwesomeIcon icon={faFile} color="#555555" size="xl" className="" />
        </div>
      );
    }
  };

  const renderAttachments = () => {
    return (
      <>
        {attachments.map((attach, index) => {
          return (
            <div key={index} className="flex items-center justify-center mt-4">
              <div className="w-11/12 h-16 border-2 flex">
                <div className="w-1/5 border-r-2">
                  {renderPreviewAttachments(attach.attachmentType, attach.src)}
                </div>
                <div className="w-4/5 h-full flex flex-col items-center justify-center mx-2 overflow-hidden">
                  <a href={attach.src}>
                    <h1 className="text-xs text-[#606060] truncate">
                      {attach.src}
                    </h1>
                  </a>
                </div>
              </div>
              <button
                className="mx-2"
                onClick={() => handleDeleteAttachment(index)}
              >
                <FontAwesomeIcon icon={faTimes} size="lg"></FontAwesomeIcon>
              </button>
            </div>
          );
        })}
      </>
    );
  };

  const AddAnnouncementModal = () => {
    return (
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-1/3">
              <div className="bg-white px-8 pb-4 pt-5">
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
                {renderAttachments()}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse justify-between items-center sm:px-6">
                <div className="flex flex-row-reverse">
                  <button
                    onClick={handlePublish}
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
                    เลือกไฟล์
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
                    เพิ่มลิงค์
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
                              onClick={handleAddLink}
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

  const handlePublish = async () => {
    addNewAnnouncement();
    setNameAnc("");
    setTextAnc("");
    setAttachments([]);
  };

  const handleCloseModal = () => {
    setIsClickAdd(false);
    setNameAnc("");
    setTextAnc("");
    setAttachments([]);
  };

  const renderAnnouncements = () => {
    if (isFetching) {
      return <div>loading...</div>;
    }
    return (
      <>
        {announcementsData.map((announcement, index) => (
          <div key={index} className="">
            <CourseAnnouncementDropdown
              teacher={{
                teacherID: announcement.teacher.teacherID,
                teacherName: announcement.teacher.teacherName,
                profilePic: announcement.teacher.profilePic,
              }}
              {...announcement}
            />
          </div>
        ))}
      </>
    );
  };
  if (isFetchingCourseDetail || isFetching) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="pb-12 px-8">
        <div className="flex items-center py-4 pl-8">
          <h1 className="font-bold text-2xl">คอร์สเรียนของฉัน</h1>
          <h2 className="rounded-full font-semibold px-2 py-1 bg-[#FF9B9B] ml-5">
            course
          </h2>
        </div>
        <h1 className="font-semibold text-xl py-4 my-4 pl-8 text-[#404040]">
          {courseDetail.name}
        </h1>
        <main className="flex w-full h-full">
          <>
            <section className="basis-1/3 flex flex-col items-start pl-8">
              <div className="w-72 h-40 bg-black flex flex-col items-center justify-center">
                <img
                  src={courseDetail.thumnailUrl}
                  alt=""
                  className="object-cover w-72 h-40"
                />
              </div>
              <div className="flex flex-col justify-start justify-items-center w-72 h-40 bg-white drop-shadow-lg pl-4 pr-5 py-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-sm font-semibold pb-1">คะแนนที่ได้</h1>
                  <div>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <FontAwesomeIcon
                        icon={faStar}
                        key={index}
                        className={`w-4 h-4 px-0.5 ${
                          index <= courseDetail.rating
                            ? "text-black"
                            : "text-gray-300"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-semibold">
                    จำนวนผู้เรียนที่ซื้อคอร์ส
                  </h2>
                  <span>{courseDetail.studentCount}</span>
                </div>

                <div className="flex h-full items-end">
                  <div className="flex overflow-hidden">
                    {courseDetail.tags.length < 3
                      ? courseDetail.tags.map((tag) => {
                          return (
                            <>
                              <div
                                className="bg-[#FF8989] h-7 w-14 mr-2 font-semibold text-black text-xs flex items-center basis-[64px] shrink-0 grow-0 justify-center"
                                key={tag.tagID}
                              >
                                <span>{tag.name}</span>
                              </div>
                            </>
                          );
                        })
                      : courseDetail.tags.map((tag, index) => {
                          if (index > 3) {
                            return (
                              <>
                                <div
                                  className="bg-[#FF8989] h-7 w-14 mr-2 font-semibold text-black text-xs flex items-center basis-[64px] shrink-0 grow-0 justify-center"
                                  key={tag.tagID}
                                >
                                  <span>{tag.name}</span>
                                </div>
                              </>
                            );
                          } else {
                            return null;
                          }
                        })}
                  </div>
                </div>
              </div>
            </section>
          </>

          <section className="flex flex-col items-start basis-2/3 w-2/3">
            <div className="flex items-center font-medium w-[800px] pr-4 pt-4 pb-2 justify-between ">
              <h1 className="text-lg font-semibold">
                โพสต์ที่ประกาศในคอร์สนี้
              </h1>
              <button onClick={handleAddAnnouncement} className="py-1">
                + สร้างโพสต์
              </button>
            </div>
            {isClickAdd && AddAnnouncementModal()}
            <div className="flex flex-col-reverse">{renderAnnouncements()}</div>
          </section>
        </main>
      </div>
    );
  }
}

export default TeacherCourseManage;
