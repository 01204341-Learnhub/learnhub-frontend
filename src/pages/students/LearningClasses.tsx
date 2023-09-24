import React from 'react'
import ClassCard from '../../features/learns/components/ClassCard'
import ClassTeachNow from '../../features/learns/components/ClassTeachNow'
import { listEnrolledClass } from '../../features/learns/services/classes'
import { EnrolledClass } from '../../features/learns/types/classes'

interface ClassTeachNowProp {
    ThumbnailUrl: string;
    TitleName: string;
    Minute: number; 
}


interface ClassCardProps {
  classThumbnailUrl: string;
  className: string;
  instructorName: string;
  percentCompleted: number;
  completionDate: Date;
}
// mockdata TeachNow
const mockClassTeachNow: ClassTeachNowProp = {
    ThumbnailUrl: "https://miro.medium.com/v2/resize:fit:1200/1*m0H6-tUbW6grMlezlb52yw.png",
    TitleName: "คณิตศาสตร์",
    Minute: 30
}


// mockdata in progress
const mockClassCardProgress: ClassCardProps[] = [
    {
        classThumbnailUrl: "https://www.mindphp.com/images/knowledge/122560/vue.jpg",
        className: "คณิตศาสตร์",
        instructorName: "อาจารย์ สมศรี สมใจ",
        percentCompleted: 50,
        completionDate: new Date(2021, 8, 1)
    },
    {
        classThumbnailUrl: "https://www.mindphp.com/images/knowledge/122560/vue.jpg",
        className: "คณิตศาสตร์",
        instructorName: "อาจารย์ สมศรี สมใจ",
        percentCompleted: 50,
        completionDate: new Date(2021, 8, 1)
    },
]

// mockdata completed
const mockClassCardComplete: ClassCardProps[] = [
    {
        classThumbnailUrl: "https://miro.medium.com/v2/resize:fit:1200/1*m0H6-tUbW6grMlezlb52yw.png",
        className: "คณิตศาสตร์",
        instructorName: "อาจารย์ สมศรี สมใจ",
        percentCompleted: 0,
        completionDate: new Date(2021, 8, 1)
    },
    {
        classThumbnailUrl: "https://miro.medium.com/v2/resize:fit:1200/1*m0H6-tUbW6grMlezlb52yw.png",
        className: "คณิตศาสตร์",
        instructorName: "อาจารย์ สมศรี สมใจ",
        percentCompleted: 0,
        completionDate: new Date(2021, 8, 1)
    },
]

const enrolledClasses = await listEnrolledClass("1")



const classesProcess = enrolledClasses.filter((enrolledClass: EnrolledClass) => enrolledClass.status === "started")
console.log(classesProcess)
const classesCompleted = enrolledClasses.filter((enrolledClass: EnrolledClass) => enrolledClass.status === "finished")
console.log(classesCompleted)


function LearningClasses() {

    const [isSelectProgcess, setIsSelectProgcess] = React.useState(true)
    const [isSelectCompleted, setIsSelectCompleted] = React.useState(false)

    const onChangeSelectProcess = () => {
        setIsSelectProgcess(true)
        setIsSelectCompleted(false)
    }

    const onChangeSelectCompleted = () => {
        setIsSelectCompleted(true)
        setIsSelectProgcess(false)
    }

    const selected = 'text-lg font-semibold border-b-8 border-black mx-4 pb-2 px-2'
    const notSelected = 'text-lg text-[#808080] font-medium border-b-8 border-transparent mx-4 px-2 pb-2'
    const selectedProcess = isSelectProgcess ? selected : notSelected
    const selectedCompleted = isSelectCompleted ? selected : notSelected



    const renderClassInProcess = () => {
        return (
            <>
                {mockClassCardProgress.map((classCard, index) => {
                    return (
                        <div key={index} className='px-4 py-3'>
                            <ClassCard {...classCard} />
                        </div>
                    )
                })}
            </>
        )
    }

    const renderClassInCompleted = () => {
        return (
            <>
                {mockClassCardComplete.map((classCard, index) => {
                    return (
                        <div key={index} className='px-4 py-3'>
                            <ClassCard {...classCard} />
                        </div>
                    )
                })}
            </>
        )
    }



    return (
        <div className='bg-[#eeeeee80] '>
            <header className='flex items-center px-12 h-40 pb-6'>
                <span className='text-3xl font-bold'>คลาสเรียนของฉัน</span>
                <div>serach bar</div>
            </header>
            <article className='flex flex-col'>
                <section className='flex flex-col items-center pt-4 px-12 bg-[#d9d9d9] h-[400px]'>
                    <h1 className='text-2xl font-semibold self-start pb-8'>คลาสเรียนที่กำลังสอน</h1>
                    <div className='flex items-center justify-center  w-[90%]'>
                        <ClassTeachNow {...mockClassTeachNow} />
                    </div>
                </section>

                <h1 className='text-2xl font-semibold pb-8 pt-4 px-12'>เลือกความคืบหน้า</h1>

                <nav className='flex px-12'>
                    <button
                        type='button'
                        onClick={onChangeSelectProcess} 
                        className={selectedProcess}>กำลังดำเนินการ</button>
                    <button 
                        type='button'
                        onClick={onChangeSelectCompleted}
                        className={selectedCompleted}>เสร็จสิ้นแล้ว</button>
                </nav>
                <hr className='border-2'/>
                <h1 className='px-12 pt-12 text-xl font-semibold'>คลาสเรียนที่กำลังดำเนิน</h1>
                <section className='flex flex-wrap px-4 pt-8 pb-12'>
                    { isSelectProgcess && renderClassInProcess()}
                    { isSelectCompleted && renderClassInCompleted()}
                </section>
            </article>
        </div>
    )
}

export default LearningClasses