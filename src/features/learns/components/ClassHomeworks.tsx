import React from "react";

interface SingleClassHomeworkProps {
  HomeworkName: string;
  ClassName: string;
  DueDate: Date | null;
  Done: boolean;
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
            {props.HomeworkName}
          </div>
          <div className="px-5 pt-3 text-[16px] text-gray-600 font-semibold">
            {props.ClassName}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="px-5 pt-8 text-[16px] text-gray-600 font-semibold text-right">
            {props.DueDate !== null ? (
              <>
                ถึง {props.DueDate.toLocaleDateString("th-TH")}{" "}
                {props.DueDate.toLocaleTimeString("th-TH", {
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
  Homeworks: React.ReactElement[];
}

function ClassHomeworks(props: ClassHomeworksProps) {
  const currentDate = new Date();

  const doneHomeworks: React.ReactElement[] = [];
  const noDueDateHomeworks: React.ReactElement[] = [];
  const pastDueHomeworks: React.ReactElement[] = [];
  const dueThisWeekHomeworks: React.ReactElement[] = [];
  const dueNextWeekHomeworks: React.ReactElement[] = [];
  const dueLaterHomeworks: React.ReactElement[] = [];

  props.Homeworks.forEach((homework: React.ReactElement) => {
    const dueDate = homework.props.DueDate;
    if (homework.props.Done) {
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
      <div className="collapse collapse-arrow bg-base-300 rounded-none w-[830px] my-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-semibold">
          ทำเสร็จแล้ว ({doneHomeworks.length})
        </div>
        <div className="collapse-content">{doneHomeworks}</div>
      </div>
      <div className="collapse collapse-arrow bg-base-300 rounded-none w-[830px] my-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-semibold">
          เกินกำหนดส่ง ({pastDueHomeworks.length})
        </div>
        <div className="collapse-content">{pastDueHomeworks}</div>
      </div>
      <div className="collapse collapse-arrow bg-base-300 rounded-none w-[830px] my-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-semibold">
          ไม่มีกำหนดส่ง ({noDueDateHomeworks.length})
        </div>
        <div className="collapse-content">{noDueDateHomeworks}</div>
      </div>
      <div className="collapse collapse-arrow bg-base-300 rounded-none w-[830px] my-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-semibold">
          กำหนดส่งภายในสัปดาห์นี้ ({dueThisWeekHomeworks.length})
        </div>
        <div className="collapse-content">{dueThisWeekHomeworks}</div>
      </div>
      <div className="collapse collapse-arrow bg-base-300 rounded-none w-[830px] my-4">
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
        Homeworks={[
          <SingleClassHomework
            HomeworkName="Homework Done"
            ClassName="Class Done"
            DueDate={new Date()}
            Done={true}
          />,
          <SingleClassHomework
            HomeworkName="Homework No Due Date"
            ClassName="Class No Due Date"
            DueDate={null}
            Done={false}
          />,
          <SingleClassHomework
            HomeworkName="Homework Past Due"
            ClassName="Class Past Due"
            DueDate={new Date("2021-09-01")}
            Done={false}
          />,
          <SingleClassHomework
            HomeworkName="Homework Due This Week"
            ClassName="Class Due This Week"
            DueDate={new Date(Date.now() + 1000 * 3600 * 24 * 3)}
            Done={false}
          />,
          <SingleClassHomework
            HomeworkName="Homework Due Next Week"
            ClassName="Class Due Next Week"
            DueDate={new Date(Date.now() + 1000 * 3600 * 24 * 10)}
            Done={false}
          />,
        ]}
      />
    </div>
  );
}

export default ClassHomeworks;
export { SingleClassHomework, ClassHomeworksTest };
