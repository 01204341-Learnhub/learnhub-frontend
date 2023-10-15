import axios from "axios";
import { Basket, BasketItem } from "../types/basket";
import {
  GetCourseDetailResponse,
  ResponseBasket,
  ResponseGetCourses,
  ResponseWishlist,
  GetClassResponse,
} from "../types/response";
import { Wishlist, WishlistItem } from "../types/wishlist";
import BasketItemSlot from "../components/BasketItemSlot";
import { getClass } from "../../learns/services/classes";
import { getCourseDetail } from "./courses";
import { ClassProgramDetail } from "../types/class";
import { CourseDetail } from "../types/course";
import { getClasses } from "./classes";
const baseUrl = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";

async function fetchWishlistItems(studentID: string) {
  const listwishlistItem: WishlistItem[] = [];
  const url = `${baseUrl}/users/students/${studentID}/wishlist`;
  const response = await axios.get<ResponseWishlist>(url);
  const wishlistItemsData = response.data.wishlist;
  for (let i = 0; i < wishlistItemsData.length; i++) {
    const basketItem = wishlistItemsData[i];
    if (basketItem.type == "class") {
      const programdetail: ClassProgramDetail = await getClasses(basketItem.program_id);
      listwishlistItem.push({
        itemID: basketItem.wishlist_item_id,
        programID: basketItem.program_id,
        price: basketItem.price,
        name: basketItem.name,
        thumbnailURL: programdetail.thumbnailURL,
        level: programdetail.difficultyLevel,
        tag: "",
        teacherName: programdetail.instructor.name,
        description: "",
      });
    } else 
    {
      const programdetail: CourseDetail = await getCourseDetail(
        basketItem.program_id
      );
      listwishlistItem.push({
        itemID: basketItem.wishlist_item_id,
        programID: basketItem.program_id,
        price: basketItem.price,
        name: basketItem.name,
        thumbnailURL: programdetail.thumnailUrl,
        rating: programdetail.rating,
        voter: programdetail.reviewerCount,
        totalTime: programdetail.videoLength,
        level: programdetail.level,
        tag: "",
        teacherName: programdetail.instructor.name,
        description: "",
      });
    }
  }

  return {
    items: listwishlistItem,
  } as Wishlist;
}

async function deleteWishlistItem(studentID: string, wishlist_item_id: string) {
  const url = `${baseUrl}/users/students/${studentID}/wishlist/${wishlist_item_id}`;
  try {
    const response = await axios.delete(url);
    return response;
  } catch (err) {
    console.log("error delete");
  }
}

async function addWishListItem(
  programID: string,
  typeProgram: string,
  studentID: string
): Promise<string | boolean> {
  const url = `${baseUrl}/users/students/${studentID}/wishlist`;
  const body = {
    type: typeProgram,
    program_id: programID,
  };

  try {
    const response = await axios.post<{ wishlist_item_id: string }>(url, body);
    const wishlistItemID = response.data.wishlist_item_id;
    if (response.status == 422) {
      return false;
    }

    return wishlistItemID;
  } catch (err) {
    console.log("errr");
    console.log(err);
  }
}

export { addWishListItem, deleteWishlistItem, fetchWishlistItems, };
