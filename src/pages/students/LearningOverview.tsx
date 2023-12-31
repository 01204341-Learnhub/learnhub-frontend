import { Link } from "react-router-dom";
import { LoadingSpash } from "../../components/LoadingSpash";
import Calendar from "../../features/learns/components/Calendar";
import ClassHomeworkIncoming from "../../features/learns/components/ClassHomeworkIncoming";
import ClassIncoming from "../../features/learns/components/ClassIncoming";
import ClassTeachNow from "../../features/learns/components/ClassTeachNow";
import { useStudentDashboard } from "../../features/learns/hooks/useStudentDashboard";
import { useUser } from "../../hooks/useUser";

function LearningOverview() {
  const { user } = useUser();
  const { dashboard, isFetching } = useStudentDashboard(user.userID);

  type _TeachingClass = {
    classThumbnail: string;
    className: string;
    classStart: Date;
  };
  function convertTimestampToDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

  function getUpcomingClasses() {
    return dashboard.classes
      .sort((a, b) => {
        const currentTimestamp = new Date().getTime() / 1000;
        const sorted_a = a.schedules.sort((a, b) => {
          return a.start - currentTimestamp - (b.start - currentTimestamp);
        });
        const sorted_b = b.schedules.sort((a, b) => {
          return a.start - currentTimestamp - (b.start - currentTimestamp);
        });
        return (
          sorted_a[0].start -
          currentTimestamp -
          (sorted_b[0].start - currentTimestamp)
        );
      })
      .filter((cls) => {
        const currentTimestamp = new Date().getTime() / 1000;
        return (
          cls.schedules[0].start >= currentTimestamp &&
          cls.schedules[0].start <= currentTimestamp + 7 * 24 * 60 * 60
        );
      });
  }

  function getUpcomingAssignments() {
    return dashboard.assignments
      .sort((a, b) => {
        const currentTimestamp = new Date().getTime() / 1000;
        return a.dueDate - currentTimestamp - (b.dueDate - currentTimestamp);
      })
      .filter((assignment) => {
        const currentTimestamp = new Date().getTime() / 1000;
        return (
          assignment.dueDate >= currentTimestamp &&
          assignment.dueDate <= currentTimestamp + 7 * 24 * 60 * 60
        );
      });
  }

  function getRecentAnnouncements() {
    return dashboard.announcements
      .sort((a, b) => {
        const currentTimestamp = new Date().getTime() / 1000;
        return currentTimestamp - a.lastEdit - (currentTimestamp - b.lastEdit);
      })
      .filter((announcement) => {
        const currentTimestamp = new Date().getTime() / 1000;
        return (
          currentTimestamp - announcement.lastEdit <=
          currentTimestamp + 7 * 24 * 60 * 60
        );
      });
  }

  function _getTeachingClass(): _TeachingClass {
    const teachingClass: _TeachingClass = {
      className: "",
      classThumbnail: "",
      classStart: new Date(),
    };
    dashboard.classes.forEach((cls) => {
      cls.schedules.forEach((sched) => {
        if (
          new Date(sched.start * 1000) <= new Date() &&
          new Date(sched.end * 1000) >= new Date()
        ) {
          teachingClass.className = cls.classInfo.className;
          teachingClass.classThumbnail = cls.classInfo.classPic;
          teachingClass.classStart = new Date(sched.start);
        }
      });
    });
    if (teachingClass.className == "") return null;
    return teachingClass;
  }
  function formatTimeFromTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  if (isFetching || !dashboard)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpash />
      </div>
    );
  const teachingClass = _getTeachingClass();
  return (
    <div className="overflow-hidden flex justify-center">
      <div className="flex flex-col pb-10 bg-[#f5f5f580]">
        <div className="flex justify-center w-full mt-10">
          <div className="w-[900px] pr-20 pb-4">
            <div className="text-3xl font-bold mt-8 pb-4">
              การเรียนรู้ของฉัน
            </div>
            <div className="text-xl font-bold pb-3 pt-4">
              คลาสเรียนที่กำลังสอนแล้ว
            </div>

            {teachingClass != null && (
              <ClassTeachNow
                thumbnailUrl={teachingClass.classThumbnail}
                titleName={teachingClass.className}
                minute={teachingClass.classStart.getMinutes()}
              />
            )}
            {teachingClass == null && (
              <div className="w-full h-full justify-center align-middle">
                <p>ไม่มีคลาสที่กำลังสอน</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center bg-white mb-4">
            <Calendar />
          </div>
        </div>

        <div className="flex w-full justify-center py-10">
          <div className="flex flex-col bg-[#f5f5f580]">
            <div className="text-2xl mt-10 pb-4 font-bold">
              คลาสเรียนที่ใกล้จะเริ่มสอน
            </div>
            <div className="mr-52">
              {getUpcomingClasses().length != 0 ? (
                getUpcomingClasses().map(
                  ({ classInfo, schedules, teacher }) => (
                    <li
                      key={classInfo.classID}
                      className={`flex justify-center mt-2`}
                    >
                      <ClassIncoming
                        titleName={classInfo.className}
                        date={convertTimestampToDate(
                          schedules[0].start
                        ).toDateString()}
                        start={`${formatTimeFromTimestamp(
                          schedules[0].start
                        )} `}
                        end={`${formatTimeFromTimestamp(schedules[0].end)} `}
                        instrName={classInfo.className}
                        profilePic={teacher.profilePic}
                      />
                    </li>
                  )
                )
              ) : (
                <div className="w-[550px] ml-10">
                  ไม่มีคลาสเรียนที่กำลังมาถึง
                </div>
              )}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-2xl pl-4 font-bold ">
              การบ้านในคลาสที่ต้องส่งเร็วๆนี้
            </h1>
            {getUpcomingAssignments().length != 0 ? (
              getUpcomingAssignments().map(
                ({
                  assignmentName,
                  assignmentID,
                  classInfo,
                  submission,
                  dueDate,
                }) => (
                  <li key={assignmentID} className={`flex justify-center mt-2`}>
                    <ClassHomeworkIncoming
                      titleName={assignmentName}
                      homeworkName={classInfo.className}
                      deadlineDayOfWeek={convertTimestampToDate(
                        dueDate
                      ).toDateString()}
                      deadlineTime={`${formatTimeFromTimestamp(dueDate)}`}
                      status={submission.submissionStatus}
                    />
                  </li>
                )
              )
            ) : (
              <div className="w-[550px] ml-20 mt-4">
                ยังไม่มีงานที่ต้องส่งเร็วๆนี้
              </div>
            )}
          </div>
        </div>

        <div className="self-start w-[500px]">
          <h1 className="font-bold text-2xl pb-4">ประกาศจากผู้สอน</h1>

          {getRecentAnnouncements().length != 0 ? (
            getRecentAnnouncements().map(
              ({ announcementID, courseInfo, teacher, lastEdit, name }) => {
                return (
                  <Link
                    to={`/learn/courses/${courseInfo.courseID}?view=announcements`}
                  >
                    <li
                      key={announcementID}
                      className={`flex justify-center mt-2`}
                    >
                      <div className="flex flex-col justify-center py-2 px-4 bg-white w-full hover:bg-blue-50 rounded-xl">
                        <div className="flex items-center px-2 pt-2 pb-4">
                          <span className="px-1 text-ellipsis line-clamp-2 font-semibold text-lg">
                            ประกาศจากคอร์สเรียน {courseInfo.courseName}
                          </span>
                        </div>
                        <div className="flex">
                          <div className="py-2 h-16 w-16  rounded-full mx-4">
                            <img
                              src={teacher.profilePic}
                              className=" h-16 w-16 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col w-[280px]">
                            <span className="text-lg truncate">
                              {teacher.teacherName}
                            </span>
                            <span className="text-base">
                              โพสต์ประกาศ{" "}
                              {convertTimestampToDate(
                                lastEdit
                              ).toLocaleDateString()}
                            </span>
                            <div className="flex items-center">
                              <span className="font-semibold text-lg">หัวข้อ:</span>
                              <span className="font-medium truncate text-lg">
                                {name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              }
            )
          ) : (
            <div className="w-[550px] ml-14 mt-2">
              <h1>ไม่มีประกาศจากผู้สอนเร็วๆนี้</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LearningOverview;
