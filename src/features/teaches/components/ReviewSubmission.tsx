import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { getFileNameFromSrc } from '../../../utils/functions'
import { ClassAssignmentSubmission } from '../types/classWork'


interface ReviewSubmissionProps {
    submission: ClassAssignmentSubmission,
    onMark: (studentID: string, score: number) => void
}

function ReviewSubmission({ submission, onMark }: ReviewSubmissionProps) {
    const [score, setScore] = useState(0)
    const handleMark = () => {
        onMark(submission.student.studentID, score)
    }
    useEffect(() => {
        setScore(submission.score)
    }, [submission.score])
    return (
        <div className="w-8/12 bg-white px-5 py-5 my-5 h-fit" >
            <div className="flex items-center mb-5">
                <div className=" justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-16 h-16 m-2 rounded-full" >
                    <img src={submission.student.profilePicture} className='w-full h-full object-cover rounded-full'/>
                </div>
                <h1 className="text-gray-600 font-bold ml-5">{submission.student.name}</h1>
                <h1 className="text-gray-600 font-bold ml-5"></h1>
                {submission.status != "unsubmit" ?
                    <div className=" flex ml-80 h-10">
                        <input type="text" className='border-2' placeholder={submission.score.toString()}
                            value={score}
                            onChange={(e) => {
                                if (e.target.value === "") return setScore(0)
                                // check if value is number
                                if (isNaN(parseInt(e.target.value))) return
                                if (parseInt(e.target.value) < 0) return
                                setScore(parseInt(e.target.value))
                            }} />
                        <div className="flex bg-black text-white w-20 justify-center items-center">คะแนน</div>
                        <button className="bg-blue-500 border-2 ml-2 w-20  text-white" onClick={handleMark}>submit</button>
                    </div> : null}
            </div>
            <div className="bg-gray-200 px-10 py-10 h-4/6 w-full rounded-lg">
                {
                    submission.attachments.map((s, idx) => {
                        return (
                            <div className="flex rounded-xl h-[120px] bg-white w-full " key={idx} >
                                <div className="flex w-[30%] h-full justify-center items-center border-2 text-center py-2">
                                    {s.attachmentType == "image" ? <img src={s.src} className='object-cover h-full w-full mx-2'/> : (
                                        <div>
                                            <FontAwesomeIcon icon={faFile} />
                                        </div>
                                    )}
                                </div>
                                <div className='flex justify-center items-center w-[70%] border-2 h-full text-center py-2'>
                                    <a className="text-blue-500" target='_blank' href={s.src}>
                                        {getFileNameFromSrc(s.src)}
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ReviewSubmission