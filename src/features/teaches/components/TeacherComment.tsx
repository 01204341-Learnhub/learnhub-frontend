import { faEllipsisVertical, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import ClassThreadReplyEntry from "../../learns/components/ClassThreadReplyEntry";
import ClassThreadReplyInputBar from "../../learns/components/ClassThreadReplyInputBar";

function TeacherComment() {
    const [classInfo, setClassInfo] = useState<ClassInfoPrototype>({
        className: "Mock class name",
        classThumbnail: fakeURL,
        teacherThumbnail: fakeTeacherThumbnail
    });
    const { user } = useUser()

    const [replyTextInput, setReplyTextInput] = useState<string>("");
    return (
        <div className=" flex flex-col bg-white shadow-lg rounded-lg">
            <div className=" w-full h-full flex flex-row justify-between p-4 items-center space-x-[5%]">
                <div className="flex flex-row items-center">
                    <div className="w-[8%] h-[8%] rounded-full overflow-hidden">
                        <img src={user.profilePicture} alt="teacher thumbnail" className=" aspect-square" />
                    </div>
                    <div className=" text-gray-600 ml-[5%] flex flex-col">
                        <div className=" font-bold text-lg">
                            {mockthread.name}
                        </div>
                        <div>
                            {mockthread.lastEditedDate.toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <div className=" flex justify-end">
                    <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                </div>
            </div>

            <div className=" text-lg font-semibold ml-[5%]">
                {mockthread.text}
            </div>

            <div className=" w-[80%] ml-[5%] mt-[4%] flex flex-row border border-gray-500">
                <div className=" w-[15%] flex justify-center items-center">
                    Preview
                </div>
                <div className=" bg-gray-600 w-[2px] h-full"></div>
                <div className=" flex flex-col">
                    <div>
                        fileName
                    </div>
                    <div>
                        {mockthread.attachments[0].type}
                    </div>
                </div>
            </div>

            <hr className=" bg-slate-400 w-full h-[2px] mt-[5%]" />

            <div className=" mt-[2%] ml-[4%] flex flex-row items-center space-x-[3%]">
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                <div className=" font-bold">
                    ความคิดเห็นในชั้นเรียน {mockStdReply.length.toString()}
                </div>
            </div>

            <div className=" ml-[3%] mt-[3%]">
                <ClassThreadReplyEntry reply={mockStdReply[0]}></ClassThreadReplyEntry>
            </div>

            <div className=" ml-[3%] mt-[3%] mb-[3%]">
                <ClassThreadReplyInputBar user={user} onAddReply={setReplyTextInput}></ClassThreadReplyInputBar>
            </div>
        </div>
    )
}


export default TeacherComment