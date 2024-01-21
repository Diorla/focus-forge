import { useTheme } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";

export default function Dots({
  activeIndex,
  setIndex,
}: {
  activeIndex: number;
  setIndex: (index: number) => void;
}) {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => setIndex(0)}>
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: activeIndex === 0 ? colors.grey0 : colors.grey4,
            borderRadius: 20,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(1)}>
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: activeIndex === 1 ? colors.grey0 : colors.grey4,
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
            backgroundColor: activeIndex === 2 ? colors.grey0 : colors.grey4,
            borderRadius: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
