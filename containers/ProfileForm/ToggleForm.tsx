import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";
import { Dispatch, SetStateAction } from "react";

export default function ToggleForm({
  isNew,
  setIsNew,
  setIsResetPassword,
}: {
  isNew: boolean;
  setIsNew: Dispatch<SetStateAction<boolean>>;
  setIsResetPassword: Dispatch<SetStateAction<boolean>>;
}) {
  const { theme } = useUser();
  return (
    <ThemedView
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 8,
      }}
    >
      <ThemedButton
        title="Forgot password"
        onPress={() => setIsResetPassword(true)}
        color={theme.grey0}
      />
      <ThemedButton
        title={isNew ? "Already a member?" : "New member?"}
        onPress={() => setIsNew(!isNew)}
        color={theme.primary}
      />
    </ThemedView>
  );
}
