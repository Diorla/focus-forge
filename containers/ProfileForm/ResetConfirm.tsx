import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";

export default function ResetConfirm({
  setIsResetPassword,
  setResetConfirmed,
  setIsNew,
}: {
  setIsResetPassword: (value: boolean) => void;
  setResetConfirmed: (value: boolean) => void;
  setIsNew: (value: boolean) => void;
}) {
  const { theme } = useUser();
  return (
    <ParallaxScrollView name="enter">
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginVertical: 20 }}
      >
        Reset password
      </ThemedText>
      <ThemedView style={{ padding: 8, alignItems: "center" }}>
        <ThemedText style={{ textAlign: "center", marginBottom: 20 }}>
          Password reset completed, please check your email for further
          instruction and then come back
        </ThemedText>
        <ThemedButton
          title="Go back"
          onPress={() => {
            setIsResetPassword(false);
            setResetConfirmed(false);
            setIsNew(false);
          }}
          color={theme.primary}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}
