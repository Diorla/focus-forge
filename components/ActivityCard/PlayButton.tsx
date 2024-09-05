import useUser from "@/context/user/useUser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function PlayButton({
  playing,
  onPress,
}: {
  playing: boolean;
  onPress: () => void;
}) {
  const { theme } = useUser();
  if (playing)
    return (
      <MaterialCommunityIcons
        name="pause"
        size={32}
        color={theme.text}
        onPress={onPress}
      />
    );
  return (
    <Ionicons
      name="play-sharp"
      size={32}
      color={theme.text}
      onPress={onPress}
    />
  );
}
