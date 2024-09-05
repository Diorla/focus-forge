import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import goBack from "@/services/routing";
import { updatePassword } from "firebase/auth";
import ThemedInput from "@/components/ThemedInput";
import { ThemedButton } from "@/components/ThemedButton";
import { useState } from "react";
import useUser from "@/context/user/useUser";
import signIn from "@/services/auth/signIn";
import { useToast } from "react-native-toast-notifications";

const defaultForm = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function TabTwoScreen() {
  const [form, setForm] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultForm);
  const toast = useToast();

  const { user } = useUser();
  const changePassword = () => {
    if (!form.oldPassword) {
      setFormError({
        ...formError,
        oldPassword: "Old password is required",
      });
      return;
    }
    if (!form.newPassword) {
      setFormError({
        ...formError,
        newPassword: "New password is required",
      });
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setFormError({
        ...formError,
        confirmPassword: "Password do not match",
      });
      return;
    }
    signIn(user.email, form.oldPassword)
      .then((user) => {
        updatePassword(user.user, form.newPassword).then(() =>
          toast.show("Password changed successfully", { type: "success" })
        );
      })
      .catch((error) => {
        setFormError({
          ...formError,
          oldPassword: error.message,
        });
      });
  };
  return (
    <ParallaxScrollView name="key">
      <ThemedView>
        <ThemedText
          type="title"
          style={{ marginVertical: 8, textAlign: "center" }}
        >
          Change password
        </ThemedText>
      </ThemedView>
      <ThemedView style={{ marginVertical: 8 }}>
        <ThemedInput
          label="Old password"
          value={form.oldPassword}
          onChangeText={(oldPassword) => setForm({ ...form, oldPassword })}
          errorMessage={formError.oldPassword}
        />
        <ThemedInput
          label="New password"
          value={form.newPassword}
          onChangeText={(newPassword) => setForm({ ...form, newPassword })}
          errorMessage={formError.newPassword}
        />
        <ThemedInput
          label="Confirm password"
          value={form.confirmPassword}
          onChangeText={(confirmPassword) =>
            setForm({ ...form, confirmPassword })
          }
          errorMessage={formError.confirmPassword}
        />
      </ThemedView>
      <ThemedView style={{ alignItems: "center" }}>
        <ThemedButton
          title="Submit"
          onPress={changePassword}
          style={{ marginVertical: 40 }}
        />
        <ThemedButton title="Close" onPress={() => goBack()} />
      </ThemedView>
    </ParallaxScrollView>
  );
}
