import axios from "axios";
import { BASE_URL } from "../../../config";
import { ListTagsResponse } from "../types/responses";
import { Tag } from "../types/tags";

async function listTags() {
  const url = `${BASE_URL}/programs/tags`;
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
