// for 0 only, empty string should still be omitted
export default function isDefined(value: unknown) {
  return value || value === 0 || value === "";
}
