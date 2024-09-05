import Checklist from "@/context/schedule/Checklist";
import dayjs from "dayjs";

const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export default function getHoursRemaining(item: Checklist) {
  if (item.occurrenceType === "daily") {
    const hoursRemaining = 24 - dayjs().hour();
    return hoursRemaining / item.remaining;
  }
  if (item.occurrenceType === "weekly") {
    const daysLeft = 7 - dayjs().day();
    const hoursRemaining = daysLeft * 24 - dayjs().hour();
    const value = hoursRemaining / item.remaining;
    return value;
  }
  const currentMonth = dayjs().month();
  const daysLeft = daysInMonth[currentMonth] - dayjs().date();
  const hoursRemaining = daysLeft * 24 - dayjs().hour();
  const value = hoursRemaining / item.remaining;
  return value;
}
