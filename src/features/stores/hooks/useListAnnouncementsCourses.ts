import { useEffect, useState } from "react";
import { listAnnouncements } from "../services/courseAnnouncements";
import { CourseAnnouncement } from "../types/courseAnnouncements";


function useAnnouncementsCourses(courseID: string) {
  
  const [announcements, setAnnouncements] = useState<CourseAnnouncement[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  
  const fetchAnnouncementsCourses = async () => {
    const announcementsData = await listAnnouncements(courseID);
    return announcementsData;
  };
  useEffect(() => {
    setIsFetching(true);
    fetchAnnouncementsCourses().then((data) => {
      setAnnouncements(data);
      setIsFetching(false);
    });
  }, [courseID]);
  return { announcements, isFetching };
}

export { useAnnouncementsCourses };