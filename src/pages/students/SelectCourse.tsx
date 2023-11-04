import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Swal from "sweetalert2";
import { LoadingSpash } from "../../components/LoadingSpash";
import CourseCard from "../../features/learns/components/CourseCard";
import { useEnrolledCourses } from "../../features/learns/hooks/useEnrolledCourses";
import { addRatingCourse } from "../../features/learns/services/ratingCourse";
import { useUser } from "../../hooks/useUser";

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

export default function SelectCourse() {
  const { user } = useUser();
  const { enrolledCourses, isFetching } = useEnrolledCourses(user.userID);
  const [query, setQuery] = useState<string>("IN-PROGRESS");
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [showReviewButton, setShowReviewButton] = useState(false);
  const [isReview, setIsReview] = useState(false);

  console.log(user.userID);

  const onRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  function handleClickReview() {
    setShowModal(true);
    setShowReviewButton(true);
    setRating(0);
  }

  function handleClickClose() {
    setShowModal(false);
    setRating(0);
  }

  async function handleClickSendRating(courseID: string) {
    const rattingID = await addRatingCourse(courseID, rating, user.userID);
    console.log(rattingID);

    Swal.fire({
      title: "สำเร็จ",
      text: "คุณได้ให้คะแนนหลักสูตรนี้แล้ว",
      icon: "success",
      timer: 1500,
    });
    setShowModal(false);
    setRating(0);
    setIsReview(true);
  }

  function renderWordRatting() {
    if (rating == 1) {
      return "แย่มาก ไม่ใช่สิ่งที่ฉันคาดหวัง";
    } else if (rating == 2) {
      return "แย่ น่าผิดหวัง";
    } else if (rating == 3) {
      return "ปานกลาง น่าจะดีกว่านี้";
    } else if (rating == 4) {
      return "ดี ตามที่คาดหวัง";
    } else if (rating == 5) {
      return "ดีมาก เกินความคาดหวัง";
    } else {
      return "เลือกการให้คะแนน";
    }
  }

  function renderModalAddReview(courseID: string) {

    return (

      <Modal>
        <div className="flex flex-col w-full h-64 items-center justify-start">
          <FontAwesomeIcon
            icon={faX}
            size="lg"
            className="self-end px-3 py-2"
            onClick={handleClickClose}
          />

          <h1 className="text-3xl font-bold h-1/5">
            {isReview ? ("แก้ไขคะแนนหลักสูตรนี้") : ("คุณจะให้คะแนนหลักสูตรนี้เท่าไร")}
          </h1>
          <p className="my-4 font-semibold text-lg">{renderWordRatting()}</p>
          <div className="rating rating-lg flex flex-row justify-center items-center px-3 py-2">
            <input
              type="radio"
              name="rating-1"
              value="1"
              className={`mask mask-star bg-gray-100  hover:bg-amber-300 ${rating >= 1 ? "bg-yellow-300" : ""
                }`}
              onChange={onRatingChange}
            />
            <input
              type="radio"
              name="rating-1"
              value="2"
              className={`mask mask-star hover:bg-amber-300 bg-gray-100  ${rating >= 2 ? "bg-yellow-300" : ""
                }`}
              onChange={onRatingChange}
            />
            <input
              type="radio"
              name="rating-1"
              value="3"
              className={`mask mask-star hover:bg-amber-300 bg-gray-100 ${rating >= 3 ? "bg-yellow-300" : ""
                }`}
              onChange={onRatingChange}
            />
            <input
              type="radio"
              name="rating-1"
              value="4"
              className={`mask mask-star hover:bg-amber-300 bg-gray-100  ${rating >= 4 ? "bg-yellow-300" : ""
                }`}
              onChange={onRatingChange}
            />
            <input
              type="radio"
              value="5"
              name="rating-1"
              className={`mask mask-star hover:bg-amber-300 bg-gray-100  ${rating >= 5 ? "bg-yellow-300" : ""
                }`}
              onChange={onRatingChange}
            />

          </div>
          {showReviewButton && (
            <button
              onClick={() => handleClickSendRating(courseID)}
              className="bg-blue-500 btn text-lg text-white px-3 py-2 rounded-md mt-4"
            >
              {isReview ? ("แก้ไขคะแนน") : ("ให้คะแนน")}
            </button>
          )}
        </div>
      </Modal>
    )
  }

  function shouldShow(progress: number): boolean {
    if (query === "IN-PROGRESS") {
      if (progress != 0 && progress != 100) {
        return true;
      }
      return false;
    } else if (query === "COMPLETED") {
      if (progress == 100) {
        return true;
      }
      return false;
    } else if (query === "NOT-START") {
      if (progress == 0) {
        return true;
      }
      return false;
    }
    throw Error("error");
  }
  if (isFetching) return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpash />
    </div>
  )

  return (
    <div className="">
      <div className="flex mt-5">
        <h1 className="ml-5 text-2xl text-black font-bold">คอร์สเรียนของฉัน</h1>
      </div>
      <div className="ml-20">
        <h1 className="text-black text-2xl font-bold my-5">
          เลือก ความคืบหน้า
        </h1>
        <div className="flex">
          <button
            onClick={() => {
              setQuery("IN-PROGRESS");
            }}
            className={`bg-white p-2 ${query === "IN-PROGRESS" ? "bg-[#808080]" : ""
              }`}
          >
            <h1 className="text-xl font-bold">กำลังดำเนินการ</h1>
            <div
              className={`w-full h-2 ${query === "IN-PROGRESS" ? "bg-slate-500" : ""
                }`}
            ></div>
          </button>
          <button
            onClick={() => {
              setQuery("NOT-START");
            }}
            className={`bg-white p-2 ${query === "NOT-START" ? "bg-[#808080]" : ""
              }`}
          >
            <h1 className="text-xl font-bold">ยังไม่ได้เริ่ม</h1>
            <div
              className={`w-full h-2 ${query === "NOT-START" ? "bg-slate-500" : ""
                }`}
            ></div>
          </button>
          <button
            onClick={() => {
              setQuery("COMPLETED");
            }}
            className={`bg-white p-2 ${query === "COMPLETED" ? "bg-[#808080]" : ""
              }`}
          >
            <h1 className="text-xl font-bold">เสร็จสิ้นแล้ว</h1>
            <div
              className={`w-full h-2 ${query === "COMPLETED" ? "bg-slate-500" : ""
                }`}
            ></div>
          </button>
        </div>
        <hr />
      </div>
      <h1 className="ml-5 text-xl font-bold mt-20">{enrolledCourses.length!=0? 'คอร์สเรียน':''}</h1>
      <ul className="grid grid-cols-5 mx-5">
        {enrolledCourses.map(
          ({ courseID, name, thumbnailUrl, teacher, progress }) => {
            if (shouldShow(progress))
              return (
                <li
                  key={courseID}
                  className={`flex flex-col w-[249px] justify-center mt-5 hover:shadow-xl rounded-bl-[20px] rounded-br-[20px] cursor-pointer`}
                >
                  <CourseCard
                    courseName={name}
                    courseID={courseID}
                    courseThumbnailUrl={thumbnailUrl}
                    instructorName={teacher.name}
                    percentCompleted={progress}
                  />
                  <div className="flex flex-col items-end justify-start w-[249px] h-[80px] bg-base-200 rounded-bl-[20px] rounded-br-[20px]">
                    <div className="rating rating-sm flex flex-row justify-end px-3 pt-2">
                      <span className="mask mask-star" />
                      <span className="mask mask-star" />
                      <span className="mask mask-star" />
                      <span className="mask mask-star" />
                      <span className="mask mask-star" />
                    </div>
                    <button
                      onClick={handleClickReview}
                      className="px-3 text-sm text-end z-10 mt-2"
                    >
                      {"ให้คะแนน"}
                    </button>
                    {showModal ? (
                      <>
                        {isReview ? (renderModalAddReview(courseID)) : (
                          (renderModalAddReview(courseID))
                        )}
                      </>
                    ) : null}
                  </div>
                </li>
              );
          }
        )}
      </ul>
    </div>
  );
}
