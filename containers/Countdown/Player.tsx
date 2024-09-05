import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";
import updateUser from "@/services/database/updateUser";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";

export default function Player({ endTimer }: { endTimer: () => void }) {
  const { theme } = useTheme();
  const { user } = useUser();
  return (
    <ThemedView
      style={{ justifyContent: "space-evenly", alignItems: "center" }}
    >
      {user.startTime ? (
        <Ionicons
          name="stop-sharp"
          size={48}
          color={theme.colors.black}
          onPress={endTimer}
        />
      ) : (
        <Ionicons
          name="play"
          size={48}
          color={theme.colors.black}
          onPress={() => updateUser({ ...user, startTime: Date.now() })}
        />
      )}
    </ThemedView>
  );
}
