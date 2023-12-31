import {
  faBook,
  faCartShopping,
  faChartColumn,
  faCirclePlay,
  faClipboardList,
  faFileArrowDown,
  faHeart,
  faInfinity,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../../../hooks/useUser";
import {
  setStatusFetchOnce,
  addItem,
  clearItem,
} from "../../../slices/basketSlice";
import { addBasketItem } from "../services/purchase";
import { fetchBasketItems } from "../services/purchase";
import daysToWeeks from "date-fns/daysToWeeks";

interface CourseDetailedSummaryProps {
  costs: number;
  quantity: number;
  level: string;
  students: number;
  videolength: number;
  examples: number;
  status: string;
  availablesource: number;
  courseID: string;
}

function CourseDetailedSummary(
  myCourseDetailedSummary: CourseDetailedSummaryProps,
) {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();
  const [isButtonDisabled,setIsButtonDisabled] = useState(true);
  async function refresh() {
    const BasketItems = await fetchBasketItems(user.userID);
    dispatcher(setStatusFetchOnce(true));
    dispatcher(clearItem());
    BasketItems.items.map((item) => {
      dispatcher(addItem(item));
    });
  }
  async function handleAddBusketItems() {
    if(isButtonDisabled){
    setIsButtonDisabled(false)
    const basketItmeID = await addBasketItem(
      myCourseDetailedSummary.courseID,
      "course",
      user.userID,
    ).catch(() => {
      Swal.fire({
        title: "ไม่สามารถดำเนินการนี้ได้",
        text: "คุณมีคอร์สนี้อยู่แล้ว หรือ คอร์สนี้อยู่ในรถเข็นอยู่แล้ว",
        icon: "error",
      });
    });
    if (!basketItmeID) {
      Swal.fire({
        title: "ไม่สามารถดำเนินการนี้ได้",
        text: "คุณมีคอร์สนี้อยู่แล้ว หรือ คอร์สนี้อยู่ในรถเข็นอยู่แล้ว",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "เพิ่มไปยังรถเข็นแล้ว",
        icon: "success",
        confirmButtonColor: "green",
      });
      dispatcher(setStatusFetchOnce(false));
    }

    refresh();
    setIsButtonDisabled(true)
  }
}
  function handleBuyCourse() {
    addBasketItem(myCourseDetailedSummary.courseID, "course", user.userID)
      .then(() => {
        dispatcher(setStatusFetchOnce(false));
        navigate("/baskets/payment");
      })
      .catch(() => {
        Swal.fire({
          title: "ไม่สามารถดำเนินการนี้ได้",
          text: "คุณมีคอร์สนี้อยู่แล้ว หรือ คอร์สนี้อยู่ในรถเข็นอยู่แล้ว",
          icon: "error",
        });
      });
  }

  function formatCourseVideoLength(): string{
    const hour = (myCourseDetailedSummary.videolength / 3600).toFixed()
    if (hour !="0") 
      return `${hour} ชั่วโมง`
    else {
      const minute = (myCourseDetailedSummary.videolength / 60).toFixed()
      return `${minute} นาที`
    }
  }


  return (
    <>
      <div className="card flex w-[518px] h-[544px] bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[5px] cursor-pointer">
        <div className="flex justify-between content-center items-center mx-[10%] pt-[2%]">
          <p className="font-bold	text-[32px] my-4">
            {myCourseDetailedSummary.costs} บาท
          </p>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-between w-[412px] h-[72.339px] border-2 border-gray-300 rounded-xl mt-2">
            <div className="flex justify-center w-[50%] items-center ">
              <div>
                <FontAwesomeIcon icon={faBook} color="#000000" size="2xl" />
              </div>
              <div className="ml-4">
                <p>บทเรียนทั้งหมด</p>
                <p className="font-bold">{myCourseDetailedSummary.quantity}</p>
              </div>
            </div>

            <div className="h-full border border-gray-300"></div>

            <div className="flex justify-center w-[50%] items-center">
              <div className="flex w-8 justify-center">
                <FontAwesomeIcon
                  icon={faChartColumn}
                  color="#000000"
                  size="2xl"
                />
              </div>
              <div className="ml-4">
                <p>ระดับความยาก</p>
                <p className="font-bold">{myCourseDetailedSummary.level}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center content-center pt-[4%] px-[10%]">
            <div className="flex w-8 justify-center">
              <FontAwesomeIcon icon={faUserGroup} color="#000000" size="xl" />
            </div>
            <p className="ml-3">
              ผู้เรียน
              <span className="font-bold ml-2">
                {myCourseDetailedSummary.students}
              </span>
            </p>
          </div>
          <div className="flex items-center content-center pt-[4%] px-[10%]">
            <div className="flex w-8 justify-center">
              <FontAwesomeIcon icon={faCirclePlay} color="#000000" size="xl" />
            </div>
            <p className="ml-3">
              วิดีโอสอน
              <span className="font-bold ml-2">
                {formatCourseVideoLength()}
              </span>
            </p>
          </div>
          <div className="flex items-center content-center pt-[4%] px-[10%]">
            <div className="flex w-8 justify-center">
              <FontAwesomeIcon
                icon={faClipboardList}
                color="#000000"
                size="xl"
              />
            </div>
            <p className="ml-3">
              แบบฝึกหัด
              <span className="font-bold ml-2">
                {myCourseDetailedSummary.examples} แบบฝึกหัด
              </span>
            </p>
          </div>
          <div className="flex items-center content-center pt-[4%] px-[10%]">
            <div className="flex w-8 justify-center">
              <FontAwesomeIcon
                icon={faFileArrowDown}
                color="#000000"
                size="xl"
              />
            </div>
            <p className="ml-3">
              แหล่งข้อมูลที่ดาวโหลดได้
              <span className="font-bold ml-2">
                {myCourseDetailedSummary.availablesource}
              </span>
            </p>
          </div>
        </div>
        {user.userType == "student" ? (
          <div className="flex pt-[15%] px-[10%]">
            <div className="pr-2">
              {user.userType == "student" ? (
                <button
                  className="bg-black shadow-xl hover:shadow-2xl cursor-pointer w-[165px] h-[65px] text-white font-bold text-xl border rounded-3xl "
                  onClick={handleBuyCourse}
                >
                  ซื้อเลย
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className="px-2">
              <button
                onClick={() => {
                  handleAddBusketItems();
                }}
                type="button"
                className="flex justify-center items-center content-center bg-white shadow-xl hover:shadow-2xl cursor-pointer w-[165px] h-[65px] text-black font-bold text-xl border-2 border-gray-300 rounded-3xl "
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  color="#000000"
                  size="xl"
                />
                <p className="ml-3">ใส่รถเข็น</p>
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default CourseDetailedSummary;
