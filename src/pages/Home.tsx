import ProgramCarousel from "../features/stores/components/ProgramCarousel";
import LearningClasses from "../pages/students/LearningClasses"


function mockPrograms(num: number) {
    const programs = []
    const mockInstructor = [
        "อาจารย์ อนันต์ สุขสวัสดิ์",
        "อาจารย์ สมชาย สุขสวัสดิ์",
        "อาจารย์ สมหญิง สุขสวัสดิ์",
        "mrs Jiraporn",
        "mr. Jirapong",
    ]
    for (let i = 0; i < num; i++) {
        programs.push({
            courseName: `คอร์สเรียนที่ ${i + 1}`,
            className: `คลาสเรียนที่ ${i + 1}`,
            courseId: ` B${i + 1}`,
            instructorName: mockInstructor[i % mockInstructor.length],
            percentCompleted: Math.floor(Math.random() * 100),
            courseThumbnailUrl: `https://picsum.photos/${i}/${300}`,
        })
    }
    return programs
}

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <div className="ml-6">
                <ProgramCarousel programs={mockPrograms(20)}
                    carouselName="คลาสเรียนยอดนิยม"
                    displayCount={3} />
            </div>
            <div className="ml-6 mt-5">
                <ProgramCarousel programs={mockPrograms(20)}
                    carouselName="คลาสเรียนใหม่ล่าสุด"
                    displayCount={3}
                />
            </div>
            <div className="ml-6">
                <ProgramCarousel programs={mockPrograms(20)}
                    carouselName="คอร์สเรียนยอดนิยม"
                    displayCount={3} />
            </div>
            <div className="ml-6 mt-5">
                <ProgramCarousel programs={mockPrograms(20)}
                    carouselName="คอร์สเรียนใหม่ล่าสุด"
                    displayCount={3}
                />
            </div>
        </div>
    )
}
