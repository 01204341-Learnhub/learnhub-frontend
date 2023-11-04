import axios from "axios";
import { BASE_URL } from "../../../config";
import { Income } from "../types/incomes";
import { ListTeacherIncomesResponse } from "../types/responses";

async function listTeacherIncomes(teacherID: string): Promise<Income[]> {
  const url = `${BASE_URL}/users/teachers/${teacherID}/incomes`;
  const res = await axios.get<ListTeacherIncomesResponse>(url);
  const incomes: Income[] = res.data.incomes.map((income) => {
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
      purchaseTime: new Date(income.purchase_time * 1000),
    };
  });
  return incomes;
}

export { listTeacherIncomes };
