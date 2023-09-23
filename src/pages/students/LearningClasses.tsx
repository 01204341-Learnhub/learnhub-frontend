import AnnulmentDropdown from  "../../pages/component/AnnulmentDropdown"
function LearningClasses() {
    const courses = [{title:"บทที่ 1: แนะนำผู้สอน ”บูม ” ",Studied:"1/3",TotalTime:"1 ชั่วโมง 15 นาที",works:[{id:1,name:"ก้อง",tpyeslot:"",time:"15 นาที"},{id:2,name:"โจโจ้",tpyeslot:"",time:"15 นาที"},{id:3,name:"โดโด้",tpyeslot:"",time:"15 นาที"}]},
                    {title:"บทที่ 2: วิธีทำให้เท่ขึ้นเหมือนบูม",Studied:"1/3",TotalTime:"1 ชั่วโมง 15 นาที",works:[{id:1,name:"ก้อง",tpyeslot:"",time:"15 นาที"},{id:2,name:"โจโจ้",tpyeslot:"",time:"15 นาที"},{id:3,name:"โดโด้",tpyeslot:"",time:"15 นาที"}]},
                    {title:"บทที่ 3: วิธีทำให้เก่งขึ้นเหมือนบูม",Studied:"1/3",TotalTime:"1 ชั่วโมง 15 นาที",works:[{id:1,name:"ก้อง",tpyeslot:"",time:"15 นาที"},{id:2,name:"โจโจ้",tpyeslot:"",time:"15 นาที"},{id:3,name:"โดโด้",tpyeslot:"",time:"15 นาที"}]}];

    return (
        <>
            <div>
                {courses.map(course => (
                    <div>
                        <AnnulmentDropdown title={course.title} works={course.works} Studied={course.Studied} TotalTime={course.TotalTime}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default LearningClasses