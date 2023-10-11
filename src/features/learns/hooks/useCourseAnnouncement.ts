import { useEffect, useState } from "react";
import { Announcement, Announcements, ListCourseAnnouncement } from "../../teaches/types/courseAnnouncements";
import { getAnnouncement, listAnnouncements } from "../services/courseAnnouncements";


function useCourseAnnouncement(courseId: string) {
  const [listCourseAnnouncement, setListCourseAnnouncement] = useState<ListCourseAnnouncement>({ announcements: [] });
  const [isFetching, setIsFetching] = useState<boolean>(false);
  // async function fetchCourseAnnouncement(courseId: string) {
  //   const listCourseAnnouncement = await listAnnouncements(courseId);
  //   setAnnouncement(listCourseAnnouncement);
  // }

  // async function fetchDetailCourseAnnouncement(courseId: string, announcementId: string) {
  //   const detailCourseAnnouncement = await getAnnouncement(courseId, announcementId);
  //   setAnnouncementDetail(detailCourseAnnouncement);
  // }


  useEffect(() => {
    async function fetchListCourseAnnouncement(courseId: string) {
      const listAnnouncement = await listAnnouncements(courseId);
      for (let i = 0; i < listAnnouncement.length; i++) {
        const announcementDetail = await getAnnouncement(courseId, listAnnouncement[i].announcementID);
        listCourseAnnouncement.announcements.push(announcementDetail);
      }
      setListCourseAnnouncement(listCourseAnnouncement);
    }
    setIsFetching(true);
    fetchListCourseAnnouncement(courseId).then(() => {
      setIsFetching(false);
    });
  }, [courseId, listCourseAnnouncement]);
  return { listCourseAnnouncement, isFetching };
}


export { useCourseAnnouncement };