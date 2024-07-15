import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";
import { TouchableOpacity } from "react-native";

export default function Dots({
  activeIndex,
  setIndex,
}: {
  activeIndex: number;
  setIndex: (index: number) => void;
}) {
  const { theme } = useUser();

  return (
    <ThemedView
      style={{ flexDirection: "row", backgroundColor: "transparent" }}
    >
      <TouchableOpacity onPress={() => setIndex(0)}>
        <ThemedView
          style={{
            height: 20,
            width: 20,
            backgroundColor: activeIndex === 0 ? theme.grey0 : theme.grey5,
            borderRadius: 20,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(1)}>
        <ThemedView
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
        <ThemedView
          style={{
            height: 20,
            width: 20,
            backgroundColor: activeIndex === 2 ? theme.grey0 : theme.grey5,
            borderRadius: 20,
          }}
        />
      </TouchableOpacity>
    </ThemedView>
  );
}
