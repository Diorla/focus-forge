import { useState } from "react";

export function useForceUpdate(): [() => void, number] {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
