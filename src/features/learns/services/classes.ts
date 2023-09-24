import { EnrolledClass } from "../types/classes"

async function listEnrolledClass( 
    studentID: string
): Promise<EnrolledClass[]> {
    studentID;
    const mock = (i : string) => {
        const m = {
            id: i,
            name: "Mahasachan",
            imageClassUrl: "",
            teacher: {
                id: i,
                name: "Baramee putty"
            },
            status: "started",
            tags: [
                {
                    id: i,
                    name: "Deep Learning"
                }
            ],
            registrationEndDate: 123412,
            price: 1990
        };
        return m;
    };
    return [mock("1"), mock("2")];
}

export { listEnrolledClass }