import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config";

async function addRatingCourse(
  courseID: string,
  rating: number,
  studentID: string
) {
  const item = {
    student_id: studentID,
    rating: rating,
  };
  const url = `${BASE_URL}/programs/courses/${courseID}/review`;
  const response = await axios.patch<{ review_id: "string" }>(url, item);
  if (response.status === 200) {
    Swal.fire({
      icon: "success",
      title: "Your rating has been added",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${response.status}`,
    });
  }
}

export { addRatingCourse };
