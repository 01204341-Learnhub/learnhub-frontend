import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfileFromFile } from "../features/profiles/services/updateProfile";
import { useUser } from "../hooks/useUser";
import { changeProfilePicture } from "../slices/userSlice";

function Profile() {
  const { user, isFetching } = useUser();
  const dispatch = useDispatch();
  const [selectProfile, setSelectProfile] = useState<boolean>(true);
  const [selectSetting, setSelectSetting] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>(user.fullname.split(" ")[0])
  const [lastName, setLastName] = useState<string>(user.fullname.split(" ")[1]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [newProfile, setNewProfile] = useState<File>()

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

  const handleNewProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfile(e.target.files![0]);
  }

  const handleClickEditProfile = () => {
    if (isEdit) {
      if (newProfile) {
        setIsUpdating(true);
        updateProfileFromFile(user.userType, user.userID, newProfile).then((res) => {
          dispatch(changeProfilePicture(res))
          setIsUpdating(false);
        })
      }
    }
    setIsEdit(!isEdit);
  }

  const ChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  }

  const ChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  }



  const classTextIsExist = " h-16 text-base font-medium text-[#505050]";
  const classTextNotExist = "h-16 text-base font-medium text-[#808080]";
  const classText = (value: string) => {
    if (value.length > 0) {
      return classTextIsExist;
    } else {
      return classTextNotExist;
    }
  }


  if (isFetching || isUpdating) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  const ButtonEditProfile = () => {
    return (
      <button
        onClick={handleClickEditProfile}
        type="button"
        className="bg-gray-100 px-4 py-2 mx-36 self-end rounded-md font-semibold mt-4"
      >
        {isEdit ? "บันทึก" : "แก้ไข"}
      </button>
    );
  }


  const renderProfile = () => {
    return (
      <div className="h-full w-[60%] px-20 pt-8 mt-8">
        <div className="flex justify-between">
          <div className="flex flex-col w-full mr-24">
            <h1 className="text-2xl font-semibold">{user.username}</h1>
            <p className="text-base py-2">
              ทุกคนจะเห็นช์่อนี้บน โปรไฟล์ของคุณและสามารถเปลี่ยนได้ทุกเมื่อ
            </p>
            <div className="flex flex-col items-start">
              <label htmlFor="FirstName" className="font-semibold text-lg py-2 mt-4">ชื่อจริง</label>

              {isEdit ? (
                <input
                  onChange={ChangeFirstName}
                  placeholder="ชื่อจริง"
                  className="border-2 border-gray-300 outline-none h-12 w-4/5 px-4 mb-4"
                  type="text"
                  name="FirstName"
                  id="FirstName" />
              ) : <span className={classText(firstName)}>{firstName ? firstName : "คุณยังไม่ตั้งชื่อของคุณ"}</span>}

              <label htmlFor="LastName" className="font-semibold text-lg py-2">นามสกุล</label>
              {isEdit ? (
                <input
                  onChange={ChangeLastName}
                  placeholder="นามสกุล"
                  className="border-2 border-gray-300 outline-none h-12 w-4/5 px-4 mb-4"
                  type="text"
                  name="LastName"
                  id="LastName" />
              ) : <span className={classText(lastName)}>{lastName ? lastName : "คุณยังไม่ตั้งนามสกุลของคุณ"}</span>}


              <label htmlFor="Occupation" className="font-semibold text-lg py-2">อาชีพ</label>



              {ButtonEditProfile()}
            </div>
          </div>


          <div className="flex flex-col avatar relative">
            <div className="w-40 h-40 rounded-full">
              <img src={(isEdit && newProfile) ? URL.createObjectURL(newProfile) : user.profilePicture} />
            </div>
            <input
              type="file"
              id="editProfilePicture"
              style={{ display: "none" }}
              value={[]}
              onChange={(e) => {
                handleNewProfileChange(e);
              }}
            />
            {isEdit ? <button className="bg-gray-100 font-semibold w-20 absolute top-40 left-24"
              onClick={() => { document.getElementById("editProfilePicture").click() }}>
              แก้ไข
            </button> : <></>}
          </div>
        </div>
      </div>
    )
  }


  const handleChangePassword = () => {
    setIsChangePassword(!isChangePassword);
  }

  const modalChangePassword = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-end">
            <button onClick={handleChangePassword}>Close</button>
          </div>
          <p> eiei {isChangePassword}</p>
        </div>
      </div>
    )
  }

  const renderSetting = () => {
    return (
      <div className="w-4/5 h-full">
        <div className="flex flex-col items-start pt-20">
          <label
            className="font-semibold text-xl py-4"
            htmlFor="Email"
          >Email</label>
          <p className="font-semibold text-[#808080] border-2 w-96 bg-[#f5f5f580] px-4 py-4">{user.email}</p>
          {/* <input
            className="border-2 border-[#808080] bg-[#f5f5f5] outline-none h-12 w-2/5 px-4 mb-4" 
            type="text" name="Email" id="Email" /> */}

          <label
            className="font-semibold text-xl py-4"
            htmlFor="Password"
          >Password</label>
          <p className="font-semibold tracking-[6px] text-[#808080] bg-[#f5f5f580] p-4 border-2 w-96 ">**********</p>
          {/* <input
            className="border-2 border-[#808080] bg-[#f5f5f5] outline-none h-12 w-2/5 px-4 mb-4" 
            type="text" name="Password" id="Password" /> */}
          <button
            onClick={handleChangePassword}
            type="button"
            className=" text-[#068FFF] text-xl rounded-md font-semibold mt-4"
          >
            เปลี่ยนรหัสผ่าน
          </button>
          {isChangePassword ? modalChangePassword() : null}
        </div>
      </div>
    )
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

      {selectProfile ? (
        renderProfile()
      ) : renderSetting()}
    </div>
  );
}
export default Profile;
