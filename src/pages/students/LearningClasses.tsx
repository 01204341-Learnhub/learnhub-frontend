import ChapterDropdown from  "../../features/learns/components/ChapterDropdown"
export default function LearningClasses() {
    const courses = [{chapterNum:1 ,name:'บทที่ 1: แนะนำผู้สอน ”บูม ” ',courseID:'A1',chapterLength:3600,lessonCount:5,lessoncompleted:3,lessons:[{name:"เริ่มจากต้องนั่งรถไฟไปเที่ยวก่อน",lessonType:"video", lessonID:"B1", finished:false, chapterID: "A1"
},{name:"มารยาทในการนั่งรถไฟ",lessonType:"video", lessonID:"B1", finished:false, chapterID: "A1"
}]},
    {chapterNum:1 ,name:'บทที่ 2: วิธีทำให้เท่ขึ้นเหมือนบูม',courseID:'A1',chapterLength:3600,lessonCount:5,lessoncompleted:2,lessons:[{name:"มารยาทในการนั่งรถไฟ",lessonType:"video", lessonID:"B1", finished:true, chapterID: "A2"}]}]
    return (
        <>
            <div>
                {courses.map(course => (
                    <div>
                        <ChapterDropdown chapterNum={course.chapterNum} name={course.name} courseID={course.courseID} chapterLength={course.chapterLength} lessonCount={course.lessonCount} 
                        lessoncompleted={course.lessoncompleted} lessons={course.lessons}/>
                    </div>
                ))}
            </div>
        </>
    )
}

