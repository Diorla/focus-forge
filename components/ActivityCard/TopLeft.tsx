import { ThemedText } from "../ThemedText";

const truncate = (str: string, n: number) => {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
};
export default function TopLeft({ name }: { name: string }) {
  return <ThemedText type="defaultSemiBold">{truncate(name, 20)}</ThemedText>;
}
