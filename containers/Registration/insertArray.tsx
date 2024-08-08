export default function insertArray<type>(
  arr: type[],
  idx: number,
  value: type
) {
  return [...arr.slice(0, idx), value, ...arr.slice(idx + 1)];
}
