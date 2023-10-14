import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Thread } from "../types/class";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import ClassThreadReplyEntry from "../../learns/components/ClassThreadReplyEntry";
import ClassThreadReplyInputBar from "../../learns/components/ClassThreadReplyInputBar";
import { Reply } from "../../learns/types/thread";
import { LearnhubUser } from "../../../types/user";

type ClassInfoPrototype = {
    className: string;
    classThumbnail: string;
    teacherThumbnail: string;
  };

const fakeURL =
"https://www.hobbyfanclub.com/web/board/2022/odtjnwftssxcxgmfjaj5191220225035856071.jpg";

const fakeTeacherThumbnail = 
  "https://scontent.fbkk22-6.fna.fbcdn.net/v/t39.30808-6/305494824_461079576060810_2645334172550963334_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEK3VHA0mex4atLPZYQZ9wnCYsANNdweP0JiwA013B4_UhN0q5hA-NjCs3Tpjd6Y8LAhmihkYTPgFGEhwffWZCN&_nc_ohc=zPEbVJrCs3AAX_tkIkk&_nc_ht=scontent.fbkk22-6.fna&oh=00_AfAdJoFNG5Z91b7iv1loO4Ct0tqbTzyWTFYxj7cz9iVAcg&oe=652EBD83";
  
function TeacherComment() {
    const [classInfo, setClassInfo] = useState<ClassInfoPrototype>({
        className: "Mock class name",
        classThumbnail: fakeURL,
        teacherThumbnail: fakeTeacherThumbnail
    });

    const [replyTextInput, setReplyTextInput] = useState<string>("");
    
    const mockthread: Thread = 
        {
            threadId: "first",
            name: "jittat",
            lastEditedDate: new Date('December 17, 1995 03:24:00'),
            text: "hellooooooooooooooooooooooooooooooooo",
            attachments: [{
                type: "PDF",
                url: "https://www.youtube.com/watch?v=1jrTW93F7Mg"
              }]
            }        

    const mockStdReply: Reply[] = [
            {
                user: {
                    userID: "1",
                    username: "BOOM",
                    userType: "student",
                    fullname: "barabolona",
                    email: "boom@gay.th",
                    profilePicture: "https://www.brandbuffet.in.th/wp-content/uploads/2020/10/alms-tracker-696x364.jpg"
                }, 
                dateTime: new Date('October 14, 2023 18:28:15') ,
                text: "my name is boom"
            }
        ]

    const mockTeacher: LearnhubUser = {
            userID: "1",
            username: "BOOM",
            userType: "student",
            fullname: "barabolona",
            email: "boom@gay.th",
            profilePicture: "https://www.brandbuffet.in.th/wp-content/uploads/2020/10/alms-tracker-696x364.jpg"
        }
    

    return (
        <div className=" flex flex-col bg-white shadow-lg rounded-lg">
            <div className=" w-full h-full flex flex-row justify-between p-4 items-center space-x-[5%]">
                <div className="flex flex-row items-center">
                    <div className="w-[8%] h-[8%] rounded-full overflow-hidden">
                        <img src={classInfo.teacherThumbnail} alt="teacher thumbnail" className=" aspect-square" />
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
                <ClassThreadReplyInputBar user={mockTeacher} onAddReply={setReplyTextInput}></ClassThreadReplyInputBar>
            </div>
        </div>
    )
}


export default TeacherComment