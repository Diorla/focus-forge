import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, View } from "react-native";

export default function Dots({
  activeIndex,
  setIndex,
}: {
  activeIndex: number;
  setIndex: (index: number) => void;
}) {
  const theme = useThemeColor();

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => setIndex(0)}>
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: activeIndex === 0 ? theme.grey0 : theme.grey5,
            borderRadius: 20,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(1)}>
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: activeIndex === 1 ? theme.grey0 : theme.grey5,
            borderRadius: 20,
            marginHorizontal: 20,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(2)}>
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: activeIndex === 2 ? theme.grey0 : theme.grey5,
            borderRadius: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
