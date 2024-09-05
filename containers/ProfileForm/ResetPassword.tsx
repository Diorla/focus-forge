import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";
import resetPassword from "@/services/auth/resetPassword";
import { logError } from "@/services/database";
import { useState } from "react";
import ErrorReader from "../ErrorReader";
import { baseForm } from "./baseForm";
import ResetPasswordProps from "./ResetPasswordProps";

export function ResetPassword({
  form,
  setFormError,
  setResetConfirmed,
  formError,
  setIsNew,
  setIsResetPassword,
}: ResetPasswordProps) {
  const [loading, setLoading] = useState(false);
  const { theme } = useUser();
  const forgotPassword = () => {
    const { email } = form;
    setLoading(true);
    if (!email) {
      setFormError({
        ...baseForm,
        email: "Email is required",
      });
      setLoading(false);
      return;
    }

    resetPassword(email)
      .then(() => {
        setResetConfirmed(true);
      })
      .catch((err) => {
        setFormError({
          ...baseForm,
          email: ErrorReader(err.message),
        });
        setLoading(false);
        logError(email, "resetting password", err);
      });

    setLoading(false);
  };

  return (
    <ParallaxScrollView name="enter">
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginVertical: 20 }}
      >
        Reset password
      </ThemedText>
      <ThemedView>
        <ThemedInput
          label="Email"
          value={form.email}
          errorMessage={formError.email}
        />
        <ThemedView
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 8,
          }}
        >
          <ThemedButton
            title="Login"
            onPress={() => {
              setIsNew(false);
              setIsResetPassword(false);
            }}
            color={theme.primary}
          />
          <ThemedButton
            title="Create Account"
            onPress={() => {
              setIsNew(true);
              setIsResetPassword(false);
            }}
            color={theme.primary}
          />
        </ThemedView>
        <ThemedView style={{ alignItems: "center", marginVertical: 36 }}>
          <ThemedButton
            title="Submit"
            outlined
            onPress={forgotPassword}
            loading={loading}
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}
