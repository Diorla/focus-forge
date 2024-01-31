import { View } from "react-native";
import { Typography } from "../../components";

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
      <Typography type="header">{title}</Typography>
      {extra}
    </View>
  );
}
