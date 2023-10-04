interface ProgramCoverWithInstructorProfileProps {
    programCoverUrl: string;
    instructor: {
        profileUrl: string;
        name: string;
        jobTitle: string;
    }
    reviewCount: number;
    rating: number;
}

export default function ProgramCoverWithInstructorProfile({ instructor, programCoverUrl, reviewCount }: ProgramCoverWithInstructorProfileProps) {
    return (
        <div className="mb-5 flex flex-col">
            <div className="relative h-[400px]">
                <img
                    src={programCoverUrl}
                    className="w-[1000px] h-[400px] object-cover rounded-xl"
                    alt="Program cover"
                />
                <img
                    className="border-white border-8 w-28 h-28 absolute bottom-[-60px] left-9 rounded-lg"
                    src={instructor.profileUrl}
                    width={80}
                    height={100}
                    alt="Instructor profile"
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className=" flex flex-col ml-[160px] mr-[20px] mt-2">
                <div></div>
                <h2 className="font-bold text-lg text-black">{instructor.name}</h2>
                <div className="flex justify-between">
                    <h3 className="text-[#808080]">{instructor.jobTitle}</h3>
                    <h3 className="text-[#606060]">{reviewCount} ผู้รีวิว</h3>
                </div>
            </div>
        </div>
    )
}