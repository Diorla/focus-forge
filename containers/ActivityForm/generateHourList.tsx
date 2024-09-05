import { getTime } from "./getTime";

export function generateHourList() {
  const arr: number[] = [];

  arr.length = 24;

  const hours = arr.fill(0).map((_item, idx) => idx);

  const timeOptions = hours.map((hour) => ({
    label: getTime(hour),
    value: String(hour),
  }));
  return timeOptions;
}
