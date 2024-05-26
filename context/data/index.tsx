import { View } from "react-native";

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View>{children}</View>;
}
