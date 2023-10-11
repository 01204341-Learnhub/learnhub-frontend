import axios from "axios";
import { Basket, BasketItem } from "../types/basket";
import { ResponseBasket } from "../types/response";

const baseUrl = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";

async function purchaseCourse(studentID: string, paymentMethodID: string) {
  // TODO: use real payment_method_id
  const url = `${baseUrl}/transactions/purchase`;
  const body = {
    student_id: studentID,
    payment_method_id: studentID,
  };

  try {
    const response = await axios.post<{ transaction_id: string }>(url, body);
    const transaction_id = response.data.transaction_id;
    return transaction_id;
  } catch (err) {
    console.log("error purchase");

    console.log(err);
  }
}

async function fetchBasketItems(studentID: string) {
  const listBasketItem: BasketItem[] = [];
  try {
    const url = `${baseUrl}/users/students/${studentID}/basket`;
    const response = await axios.get<ResponseBasket>(url);
    const basketItemsData = response.data.basket;

    basketItemsData.map((basketItem) => {
      listBasketItem.push({
        itemID: basketItem.basket_item_id,
        programID: basketItem.program_id,
        price: basketItem.price,
        name: basketItem.name,
        thumbnailURL: basketItem.program_pic,
        rating: basketItem.rating,
        voter: basketItem.review_count,
        totalTime: basketItem.total_video_length,
        level: basketItem.difficulty_level,
        tag: "",
        teacherName: basketItem.teacher.teacher_name,
        description: "",
      });
    });

    return {
      items: listBasketItem,
    } as Basket;
  } catch (err) {
    console.log("err to fetchBasketItems");
    //console.error(err);
  }
}

async function deleteBasketItem(studentID: string, basketItemID: string) {
  const url = `${baseUrl}/users/students/${studentID}/basket/${basketItemID}`;
  try {
    const response = await axios.delete(url);
    return response;
  } catch (err) {
    console.log("error delete");
  }
}

async function addBasketItem(
  programID: string,
  typeProgram: string,
  studentID: string
): Promise<string | boolean> {
  const url = `${baseUrl}/users/students/${studentID}/basket`;
  const body = {
    program_id: programID,
    type: typeProgram,
  };

  try {
    const response = await axios.post<{ basket_item_id: string }>(url, body);
    const basketItemID = response.data.basket_item_id;
    if (response.status == 422) {
      return false;
    }

    return basketItemID;
  } catch (err) {
    console.log("errr");
    console.log(err);
  }
}

export { addBasketItem, deleteBasketItem, fetchBasketItems, purchaseCourse };
