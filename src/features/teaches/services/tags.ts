import axios from "axios";
import { ListTagsResponse } from "../types/responses";
import { Tag } from "../types/tags";

const baseURL = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";
async function listTags() {
  const url = `${baseURL}/programs/tags`;
  const res = await axios.get<ListTagsResponse>(url);
  const tags: Tag[] = res.data.tags.map((tag) => {
    return {
      tagID: tag.tag_id,
      name: tag.tag_name,
    };
  });
  return tags;
}

export { listTags };
