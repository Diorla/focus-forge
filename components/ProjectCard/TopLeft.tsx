import { Link } from "expo-router";
import { ThemedText } from "../ThemedText";

const truncate = (str: string, n: number) => {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
};
export default function TopLeft({ id, name }: { id: string; name: string }) {
  return (
    <Link href={`/activity/${id}`}>
      <ThemedText type="defaultSemiBold">{truncate(name, 20)}</ThemedText>
    </Link>
  );
}
