import { useEffect, useState } from "react";
import { listTags } from "../services/tags";
import { Tag } from "../types/tags";

function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  async function fetchTags() {
    setIsFetching(true);
    const fetchedTags = await listTags();
    setTags(fetchedTags);
    setIsFetching(false);
  }
  useEffect(() => {
    fetchTags();
  }, []);
  return { tags, isFetching };
}

export { useTags };
