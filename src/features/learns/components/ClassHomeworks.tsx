import React from "react";

interface SingleClassHomeworkProps {
  homeworkName: string;
  className: string;
  dueDate: Date | null;
  done: boolean;
}

function SingleClassHomework(props: SingleClassHomeworkProps) {
  return (
    // a horizontal card with class name, homework name, and due date
    // when hovered, the card will have a black strip on the left
    <div className="group card w-[790px] h-[95px] bg-base-100 rounded-none hover:drop-shadow-lg cursor-pointer">
      <div className="flex flex-row justify-between">
        <div className="absolute px-0 w-2 h-full group-hover:bg-black"></div>
        <div className="flex flex-col justify-between">
          <div className="px-5 pt-3 text-[20px] font-semibold">
            {props.homeworkName}
          </div>
          <div className="px-5 pt-3 text-[16px] text-gray-600 font-semibold">
            {props.className}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="px-5 pt-8 text-[16px] text-gray-600 font-semibold text-right">
            {props.dueDate !== null ? (
              <>
                ถึง {props.dueDate.toLocaleDateString("th-TH")}{" "}
                {props.dueDate.toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </>
            ) : (
              "ไม่มีกำหนดส่ง"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ClassHomeworksProps {
  homeworks: React.ReactElement[];
}

function ClassHomeworks(props: ClassHomeworksProps) {
  const currentDate = new Date();

  const doneHomeworks: React.ReactElement[] = [];
  const noDueDateHomeworks: React.ReactElement[] = [];
  const pastDueHomeworks: React.ReactElement[] = [];
  const dueThisWeekHomeworks: React.ReactElement[] = [];
  const dueNextWeekHomeworks: React.ReactElement[] = [];
  const dueLaterHomeworks: React.ReactElement[] = [];

  props.homeworks.forEach((homework: React.ReactElement) => {
    const dueDate = homework.props.dueDate;
    if (homework.props.done) {
      doneHomeworks.push(homework);
    } else if (dueDate === null) {
      noDueDateHomeworks.push(homework);
    } else {
      const timeDiff = dueDate.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (timeDiff < 0) {
        pastDueHomeworks.push(homework);
      } else if (daysDiff <= 7) {
        dueThisWeekHomeworks.push(homework);
      } else if (daysDiff <= 14) {
        dueNextWeekHomeworks.push(homework);
      } else {
        dueLaterHomeworks.push(homework);
      }
    }
  });

  return (
    <>
      <div className="collapse collapse-arrow bg-base-300 rounded-none  my-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-semibold">
          ทำเสร็จแล้ว ({doneHomeworks.length})
        </div>
        <div className="collapse-content">{doneHomeworks}</div>
      </div>
      <div className="collapse collapse-arrow bg-base-300 rounded-none my-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-semibold">
          เกินกำหนดส่ง ({pastDueHomeworks.length})
        </div>
        <div className="collapse-content">{pastDueHomeworks}</div>
      </div>
      <div className="collapse collapse-arrow bg-base-300 rounded-none my-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-semibold">
          ไม่มีกำหนดส่ง ({noDueDateHomeworks.length})
        </div>
        <div className="collapse-content">{noDueDateHomeworks}</div>
      </div>
      <div className="collapse collapse-arrow bg-base-300 rounded-none   my-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-semibold">
          กำหนดส่งภายในสัปดาห์นี้ ({dueThisWeekHomeworks.length})
        </div>
        <div className="collapse-content">{dueThisWeekHomeworks}</div>
      </div>
      <div className="collapse collapse-arrow bg-base-300 rounded-none   my-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-semibold">
          กำหนดส่งภายในสัปดาห์หน้า ({dueNextWeekHomeworks.length})
        </div>
        <div className="collapse-content">{dueNextWeekHomeworks}</div>
      </div>
    </>
  );
}

function ClassHomeworksTest() {
  return (
    <div>
      <ClassHomeworks
        homeworks={[
          <SingleClassHomework
            homeworkName="Homework Done"
            className="Class Done"
            dueDate={new Date()}
            done={true}
          />,
          <SingleClassHomework
            homeworkName="Homework No Due Date"
            className="Class No Due Date"
            dueDate={null}
            done={false}
          />,
          <SingleClassHomework
            homeworkName="Homework Past Due"
            className="Class Past Due"
            dueDate={new Date("2021-09-01")}
            done={false}
          />,
          <SingleClassHomework
            homeworkName="Homework Due This Week"
            className="Class Due This Week"
            dueDate={new Date(Date.now() + 1000 * 3600 * 24 * 3)}
            done={false}
          />,
          <SingleClassHomework
            homeworkName="Homework Due Next Week"
            className="Class Due Next Week"
            dueDate={new Date(Date.now() + 1000 * 3600 * 24 * 10)}
            done={false}
          />,
        ]}
      />
    </div>
  );
}

export default ClassHomeworks;
export { SingleClassHomework, ClassHomeworksTest };
