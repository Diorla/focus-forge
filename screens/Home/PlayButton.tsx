import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function PlayButton({
  playing,
  onPress,
}: {
  playing: boolean;
  onPress: () => void;
}) {
  if (playing)
    return (
      <MaterialCommunityIcons
        name="pause"
        size={32}
        color="black"
        onPress={onPress}
      />
    );
  return (
    <Ionicons name="play-sharp" size={32} color="black" onPress={onPress} />
  );
}
