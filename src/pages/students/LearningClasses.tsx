import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpash } from '../../components/LoadingSpash';
import ClassCard from '../../features/learns/components/ClassCard';
import ClassTeachNow from '../../features/learns/components/ClassTeachNow';
import { useEnrolledClasses } from '../../features/learns/hooks/useEnrolledClasses';
import { EnrolledClass } from '../../features/learns/types/classes';
import { useUser } from '../../hooks/useUser';

interface ClassTeachNowProp {
    thumbnailUrl: string;
    titleName: string;
    minute: number;
}


function LearningClasses() {

    const { user } = useUser()
    const { enrolledClasses, isFetching } = useEnrolledClasses(user.userID)
    const [progressQuery, setProgressQuery] = useState<"IN-PROGRESS" | "NOT-START" | "ENDED">('IN-PROGRESS')

    const selected = 'text-lg font-semibold border-b-8 border-black mx-4 pb-2 px-2'
    const notSelected = 'text-lg text-[#808080] font-medium border-b-8 border-transparent mx-4 px-2 pb-2'

    function _getTeachingClass(): ClassTeachNowProp {
        console.log(enrolledClasses)
        const teachingClass: ClassTeachNowProp = {
            titleName: "",
            thumbnailUrl: "",
            minute: 0,
        }
        enrolledClasses.forEach((cls) => {
            cls.schedules.forEach((sched) => {
                if (
                    new Date(sched.start) <= new Date() &&
                    new Date(sched.end) >= new Date()
                ) {
                    teachingClass.titleName = cls.name
                    teachingClass.thumbnailUrl = cls.imageClassUrl
                    teachingClass.minute = sched.start.getMinutes()
                }
            })
        })
        if (teachingClass.titleName == "") return null
        return teachingClass
    }

    const queryValidation = (c: EnrolledClass) => {
        if (progressQuery == 'NOT-START') {
            return c.registrationEndDate > new Date()
        } else if (progressQuery == 'IN-PROGRESS') {
            return c.registrationEndDate < new Date() && c.endDate > new Date()
        } else if (progressQuery == 'ENDED') {
            return c.endDate < new Date()
        }
        throw new Error('Invalid query')
    }

    const renderClasses = () => {
        return (
            <>
                {enrolledClasses.map((c, index) => {
                    if (!queryValidation(c)) {
                        return null
                    }
                    return (
                        <div key={index} className='px-4 py-3'>
                            <Link to={c.id} >
                                <ClassCard classThumbnailUrl={c.imageClassUrl} className={c.name} instructorName={c.teacher.name} completionDate={new Date()} />
                            </Link> :
                        </div>
                    )
                })}
            </>
        )
    }
    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpash />
            </div>
        )
    }

    const teachingClass = _getTeachingClass()

    return (
        <div className=''>
            <header className='flex items-center px-12 h-40 pb-6'>
                <span className='text-3xl font-bold'>คลาสเรียนของฉัน</span>
            </header>
            <article className='flex flex-col'>
                <section className='flex flex-col items-center pt-4 px-12 bg-[#d9d9d9] h-[360px]'>
                    <h1 className='text-2xl font-semibold self-start pb-8'>คลาสเรียนที่กำลังสอน</h1>
                    <div className='flex items-center justify-center  w-[90%]'>
                        {
                            teachingClass != null &&
                            <ClassTeachNow {...teachingClass} />
                        }
                        {
                            teachingClass == null &&
                            <div className="w-full h-full justify-center align-middle">
                                <p>
                                    ไม่มีคลาสที่กำลังสอน
                                </p>
                            </div>
                        }
                    </div>
                </section>

                <h1 className='text-2xl font-semibold pb-8 pt-4 px-12'>เลือกความคืบหน้า</h1>

                <nav className='flex px-12'>
                    <button
                        type='button'
                        onClick={() => { setProgressQuery('IN-PROGRESS') }}
                        className={progressQuery == "IN-PROGRESS" ? selected : notSelected}>กำลังดำเนินการ</button>
                    <button
                        type='button'
                        onClick={() => { setProgressQuery('NOT-START') }}
                        className={progressQuery == "NOT-START" ? selected : notSelected}>ยังไม่เริ่ม</button>
                    <button
                        type='button'
                        onClick={() => { setProgressQuery('ENDED') }}
                        className={progressQuery == "ENDED" ? selected : notSelected}>จบไปแล้ว</button>
                </nav>
                <hr className='border-2' />
                <h1 className='px-12 pt-12 text-xl font-semibold'>คลาสเรียนที่กำลังดำเนิน</h1>
                <section className='flex flex-wrap px-4 pt-8 pb-12'>
                    {renderClasses()}
                </section>
            </article>
        </div>
    )
}

export default LearningClasses