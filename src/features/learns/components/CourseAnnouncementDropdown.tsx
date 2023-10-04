import { faAngleDown, faAngleUp, faDownload, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';



interface CourseAnnouncementDropdownProps {
    topic: string,
    postDate: string
    content: string
    teacherName: string
    teacherProfile: string
}

const CourseAnnouncementDropdown = ({ topic, postDate, content, teacherName, teacherProfile }: CourseAnnouncementDropdownProps) => {
    const [isExpanded, setIsExpanded] = useState(false);


    const year = parseInt(postDate.slice(4), 10) + 2000; // Convert YY to 20YY
    const month = parseInt(postDate.slice(0, 2), 10) - 1; // Month is 0-based (0-11)
    const day = parseInt(postDate.slice(2, 4), 10);

    const daysOfWeek = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
    const date = new Date(year, month, day);
    const dayOfWeek = daysOfWeek[date.getDay()];

    function intToThaiMonth(month: number) {
        const thaiMonth = [
            "ม.ค.", "ก.พ.", "มี.ค.",
            "เม.ย.", "พ.ค.", "มิ.ย.",
            "ก.ค.", "ส.ค.", "ก.ย.",
            "ต.ค.", "พ.ย.", "ธ.ค."
        ]

        if (month >= 1 && month <= 12) {
            return thaiMonth[month - 1]
        } else {
            return "invalid month";
        }
    }

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const mockFiles = [
        { id: 1, name: 'SampleFile1.pdf' },
        { id: 2, name: 'SampleFile2.docx' },
    ];

    return (
        <div className="border-2 border-t-[#919191] bg-[#ECF3F9] w-[770px] py-4 m-4">
            <div
                className="cursor-pointer w-full "
                onClick={toggleExpansion}
            >
                <div className="flex items-center justify-between">

                    <h3 className=" flex-grow ml-[25px] text-lg font-bold">{topic}</h3>
                    <p className=" mr- text-sm text-gray-500">วัน {dayOfWeek} {day} {intToThaiMonth(month)} </p>
                    {isExpanded ? (
                        <FontAwesomeIcon icon={faAngleUp} color='black' size='xl' className=' mr-5 ml-4' />
                    ) : (
                        <FontAwesomeIcon icon={faAngleDown} color='black' size='xl' className=' mr-5 ml-4' />
                    )}
                </div>
            </div>

            {isExpanded && (
                <div className="  bg-white mt-4 w-full">
                    {/* Content goes here */}
                    <div>
                        <div className='flex flex-row'>
                            <div className='w-[55px] h-[55px] m-[20px] bg-black rounded-full' />
                            <div className='my-[20px]'>
                                <h3 className='font-bold text-[18px]'>{teacherName}</h3>
                                <p className='text-[16px]'>โพสประกาศ วัน {dayOfWeek} {day} {intToThaiMonth(month)}     </p>
                            </div>
                        </div>
                        <div className='mx-[95px]'>
                            <h3 className='font-bold text-[20px]'>{topic}</h3>
                            <p className="text-black">{content}</p>
                        </div>

                        {mockFiles.map((file) => (
                            <a
                                key={file.id}
                                href={`/path/to/your/files/${file.name}`} // Set the actual file path
                                download={file.name}
                                className='flex flex-row items-center border border-[#a0a0a0]-50 mx-[25px] mt-[10px] h-[90px]'
                            >
                                <div className=' w-[90px] h-full border border-[#a0a0a0]-50 flex items-center justify-center'>
                                    <FontAwesomeIcon icon={faFile} color='#555555' size='2xl' className='' />
                                </div>
                                <p className=' flex-grow ml-[20px] font-semibold text-[18px]'>{file.name}</p>
                                <FontAwesomeIcon icon={faDownload} color='#555555' size='2xl' className=' mr-8 ' />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseAnnouncementDropdown;