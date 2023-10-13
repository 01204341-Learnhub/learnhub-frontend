import axios from "axios";
import { Income } from "../types/incomes"
import { ListTeacherIncomesResponse } from "../types/responses";


const baseURL = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";
async function listTeacherIncomes(teacherID: string): Promise<Income[]> {
    const url = `${baseURL}/users/teachers/${teacherID}/incomes`
    const res = await axios.get<ListTeacherIncomesResponse>(url);
    const incomes : Income[] = res.data.incomes.map((income) => {
        return {
            type: income.type,
            programID: income.program_id,
            programPic: income.program_pic,
            name: income.name,
            buyer: {
                studentID: income.buyer.student_id,
                studentName: income.buyer.student_name,
            },
            price: income.price,
        }
    })
    return incomes
}

export {listTeacherIncomes}