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
                    className="w-full h-full object-cover rounded-xl"
                    alt="Program cover"
                />
                <img
                    className="border-white border-8 absolute bottom-[-40px] left-0 rounded-lg"
                    src={instructor.profileUrl}
                    width={80}
                    height={100}
                    alt="Instructor profile"
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className="mx-[85px]">
                <h2 className="font-bold text-black">{instructor.name}</h2>
                <h3 className="text-gray-400">{instructor.jobTitle}</h3>
            </div>
            <h3 className="text-gray-400 ml-auto">{reviewCount} ผู้รีวิว</h3>
        </div>
    )
}