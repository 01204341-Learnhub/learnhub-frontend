import AnnulmentDropdown from  "../../pages/component/AnnulmentDropdown"
function LearningClasses() {
    const courses = [{title:"บทที่ 1: แนะนำผู้สอน ”บูม ” ",works:[{id:1,name:"ก้อง"},{id:2,name:"โจโจ้"},{id:3,name:"โดโด้"}]},
                    {title:"บทที่ 2: วิธีทำให้เท่ขึ้นเหมือนบูม",works:[{id:1,name:"ก้อง"},{id:2,name:"โจโจ้"},{id:3,name:"โดโด้"}]},
                    {title:"บทที่ 3: วิธีทำให้เก่งขึ้นเหมือนบูม",works:[{id:1,name:"ก้อง"},{id:2,name:"โจโจ้"},{id:3,name:"โดโด้"}]}];

    return (
        <>
            <div>
                {courses.map(course => (
                    <div>
                        <AnnulmentDropdown title={course.title} works={course.works}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default LearningClasses