import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { capitalizeFirstLetter } from "../../../utils/functions";

interface BetterCalendarProps {
  onDateSelect?: (date: Date) => void;
  targetDates?: Date[];
}

function BetterCalendar({ onDateSelect, targetDates }: BetterCalendarProps) {
  const today = startOfToday();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  const firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const isSameDayAsTarget = (currentDate: Date, targetDate: Date) => {
    return (
      currentDate.getDate() === targetDate.getDate() &&
      currentDate.getMonth() === targetDate.getMonth() &&
      currentDate.getFullYear() === targetDate.getFullYear()
    );
  }
  const isInTargetDates = (date: Date) => {
    return targetDates?.some(targetDate => isSameDayAsTarget(date, targetDate));
  }
  const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };

  return (
    <div className="p-6 w-full h-full flex items-center justify-center shadow-xl bg-white">
      <div className="w-[400px] h-[280px]">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-xl">
            {format(firstDayOfMonth, "MMMM yyyy")}
          </p>
          <div className="flex items-center justify-evenly gap-6 sm:gap-4">
            <ChevronLeftIcon
              className="w-6 h-6 cursor-pointer"
              onClick={getPrevMonth}
            />
            <ChevronRightIcon
              className="w-6 h-6 cursor-pointer"
              onClick={getNextMonth}
            />
          </div>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-7 gap-6 sm:gap-1 place-items-center">
          {days.map((day, idx) => {
            return (
              <div key={idx} className="font-semibold">
                {capitalizeFirstLetter(day)}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-7 gap-6 sm:gap-1 mt-4 place-items-center">
          {daysInMonth.map((day, idx) => {
            const date = parse(
              `${format(day, "dd-MM-yyyy")} 00:00:00`,
              "dd-MM-yyyy HH:mm:ss",
              new Date()
            );
            const isSameDayAsTargetDate = targetDates ? isInTargetDates(date) : false;
            return (
              <div key={idx} className={colStartClasses[getDay(day)]}>
                <p
                  className={`cursor-pointer flex items-center justify-center font-semibold h-8 w-8 rounded-full  hover:text-white ${isSameMonth(day, today) ? "text-gray-900" : "text-gray-400"
                    } ${!isToday(day) && "hover:bg-blue-500"} ${isToday(day) && "bg-red-500 text-white"
                    } ${isSameDayAsTargetDate && "bg-blue-500 text-white"}`}
                  onClick={() => {
                    onDateSelect?.(date)
                  }}>
                  {format(day, "d")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BetterCalendar;