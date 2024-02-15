// for 0 only, empty string should still be omitted
export function NumberIsDefined(value: unknown) {
  return typeof value === "number" && !Number.isNaN(value);
}
