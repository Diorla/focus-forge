import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

export default function SectionHeader({
  title,
  extra,
}: {
  title: string;
  extra?: React.ReactNode;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,
        marginTop: 24,
      }}
    >
      <ThemedText type="title">{title}</ThemedText>
      {extra}
    </View>
  );
}
