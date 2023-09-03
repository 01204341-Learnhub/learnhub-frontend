const teacher_rating=3.5
const students = Math.floor(Math.random() * 100)
const classes = Math.floor(Math.random() * 100)
const courses = Math.floor(Math.random() * 100)

export default function TeacherProfileCard() {
    return (
        <div className="w-[343px] h-[524px] bg-white flex flex-col items-center">
            <img className="mt-[24px] rounded-full w-[200px] h-[200px]" src='../../src/assets/images/reg-teacher.png'></img>
            <div className="mt-[44px]">
                <div className="font-extrabold text-black text-[20px]">Baramyte Barobolona</div>
                <div className=" font-bold text-gray-500 text-[14px]">ศาสตราจารย์</div>
                <div className="py-2 flex items-center space-x-1 text-[14px] font-bold">{teacher_rating}
                    {[1, 2, 3, 4, 5].map((index) => (
                        <svg
                        key={index}
                        className={`w-3 h-3 ${index <= teacher_rating ? 'text-black' : 'text-gray-300 dark:text-gray-500'}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        >
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                        />
                        </svg>
                    ))}
                </div>
                <div className=" font-bold text-black text-[15px]">ผู้เรียน {students} คน</div>
                <div className=" font-bold text-black text-[15px]">มีหลักสูตร {courses + classes} รายการ</div>
                <div className=" font-bold text-gray-500 text-[15px]">-หลักสูตรคอร์สเรียน {courses} รายการ</div>
                <div className=" font-bold text-gray-500 text-[15px]">-หลักสูตรคลาสเรียน {classes} รายการ</div>
            </div>
        </div>
    )
}
