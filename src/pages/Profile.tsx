import { useState } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "../hooks/useUser";
import { changeProfilePicture } from "../slices/userSlice";

function Profile() {
  const { user, isFetching } = useUser();
  const dispatch = useDispatch();
  const [selectProfile, setSelectProfile] = useState<boolean>(true);
  const [selectSetting, setSelectSetting] = useState<boolean>(false);

  const classNameSelectProfile = selectProfile
    ? "border-b-[10px] border-black ml-2 py-2 px-3 border-b-[12px] z-10"
    : "border-b-[12px] border-white ml-2 py-2 px-3";
  const classNameSelectSetting = selectSetting
    ? "border-b-[10px] border-black ml-4 py-2 px-3 border-b-[12px] z-10"
    : "border-b-[12px] border-white ml-4 py-2 px-3";

  const handleSelectProfile = () => {
    setSelectProfile(true);
    setSelectSetting(false);
  };

  const handleSelectSetting = () => {
    setSelectProfile(false);
    setSelectSetting(true);
  };
  if (isFetching) {
    console.log("isFetching", isFetching);

    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full relative">
      <div className="self-start flex justify-center text-2xl font-bold py-2 px-20">
        <button
          onClick={handleSelectProfile}
          type="button"
          className={classNameSelectProfile}
        >
          <h1>โปรไฟล์</h1>
        </button>
        <button
          onClick={handleSelectSetting}
          type="button"
          className={classNameSelectSetting}
        >
          <h1>ตั้งค่าบัญชี</h1>
        </button>
      </div>
      <div className="h-3 w-full bg-gray-200 absolute top-14 z-0"></div>
      <div className="h-full w-[60%] px-20 pt-8 mt-8">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold">ชื่อของคุณ</h1>
            <p className="text-base py-2">
              ทุกคนจะเห็นช์่อนี้บน โปรไฟล์ของคุณและสามารถเปลี่ยนได้ทุกเมื่อ
            </p>
            <h2 className="font-bold">{user.username}</h2>
          </div>
          <div className="flex flex-col avatar relative">
            <div className="w-40 h-40 rounded-full">
              <img src={user.profilePicture} />
            </div>
            <input
              type="file"
              id="editProfilePicture"
              style={{ display: "none" }}
              value={[]}
              onChange={(e) => {
                dispatch(changeProfilePicture(URL.createObjectURL(e.target.files![0])));
              }}
            />
            <button className="bg-gray-100 font-semibold w-20 absolute bottom-[-15px] left-24"
              onClick={() => { document.getElementById("editProfilePicture").click() }}>
              แก้ไข
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
