import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"


interface PostClassProps {
    fileName: string
    fileType: string
    imageURL: string
}

export default function PostClass(props: PostClassProps) {
    return (
        <div className=" w-[765px] h-[450px] bg-white shadow-2xl flex flex-col">
            <input type="text" className=" w-[700px] h-[230px] ml-[32px] mt-[32px] bg-[#D9D9D9]"></input>
            <hr className=" bg-slate-800 w-[700px] ml-[32px] h-[4px]" />

            <div className=" w-[700px] h-[92px] ml-[32px] mt-4 flex flex-row relative">
                <div className=" w-[15%]">
                    <img src={props.imageURL} alt="image" className=" w-full h-full"/>
                </div>
                <div className=" bg-slate-500 w-[2px] h-full"></div>
                <div className=" font-bold absolute ml-32 mt-2 text-xl">{props.fileName}</div>
                <div className="absolute ml-32 mt-10 text-lg">{props.fileType}</div>
            </div>
            
            <div className=" flex relative">
                <div className=" mt-6 ml-[40px] space-x-5 absolute">
                    <Link to={{ pathname: "/Home"}}>
                        <FontAwesomeIcon icon={ faUpload } size="lg"></FontAwesomeIcon>
                    </Link>
                    <Link to={{ pathname: "/Home"}}>
                        <FontAwesomeIcon icon={ faPaperclip} size="lg"></FontAwesomeIcon>
                    </Link>
                </div>

                <div className=" space-x-3 right-6 top-4 absolute">
                    <Link to={{ pathname: "/Home"}} className=" rounded-xl text-gray-500 bg-white">
                        ยกเลิก
                    </Link>

                    <Link to={{ pathname: "/Home"}} className=" text-white bg-black p-1">
                        โพสต์
                    </Link>
                </div>
            </div>
        </div>
    );
}