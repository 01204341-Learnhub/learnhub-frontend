import { EnrolledClass } from "../types/classes"

async function listEnrolledClass( 
    studentID: string
): Promise<EnrolledClass[]> {
    studentID;
    const mock = (i : string, status: string) => {
        const m = {
            id: i,
            name: "Mahasachan",
            imageClassUrl: "https://www.mindphp.com/images/knowledge/122560/vue.jpg",
            teacher: {
                id: i,
                name: "Baramee putty"
            },
            status: status,
            tags: [
                {
                    id: i,
                    name: "Deep Learning"
                }
            ],
            registrationEndDate: new Date(2022, 12, 8),
            price: 1990
        };
        return m;
    };
    return [mock("1", "finished"), mock("2", "started"), mock("3", "started"), mock("4", "stared")];
}



export { listEnrolledClass }