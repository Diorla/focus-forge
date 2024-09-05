export function getTime(value: number) {
  if (value === 0) return "12am";
  if (value === 12) return "12pm";
  return `${value < 12 ? value + " am" : value - 12 + " pm"}`;
}
