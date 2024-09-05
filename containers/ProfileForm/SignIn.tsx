import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import signIn from "@/services/auth/signIn";
import { logError } from "@/services/database";
import saveUserCred from "@/services/database/saveUserCred";
import { useState } from "react";
import ErrorReader from "../ErrorReader";
import { baseForm } from "./baseForm";
import MainFormProps from "./MainFormProps";
import ToggleForm from "./ToggleForm";
import handleFormError from "./handleFormError";

export function SignIn({
  isNew,
  setIsNew,
  form,
  setFormError,
  setForm,
  formError,
  setIsResetPassword,
}: MainFormProps) {
  const [loading, setLoading] = useState(false);
  const submit = () => {
    const { email, password } = form;
    setLoading(true);
    const error = handleFormError(form, isNew);
    if (error) {
      setFormError(error);
      setLoading(false);
      return;
    }

    signIn(email, password)
      .then(() => {
        saveUserCred(email, password);
      })
      .catch((err) => {
        setFormError({
          ...baseForm,
          password: ErrorReader(err.message),
        });
        setLoading(false);
        logError(email, "signing in", err);
      });
    setLoading(false);
  };

  return (
    <ParallaxScrollView name="enter">
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginVertical: 20 }}
      >
        Login
      </ThemedText>
      <ThemedView>
        <ThemedInput
          label="Email"
          value={form.email}
          onChangeText={(email) =>
            setForm({
              ...form,
              email,
            })
          }
          errorMessage={formError.email}
        />
        <ThemedInput
          label="Password"
          value={form.password}
          onChangeText={(password) =>
            setForm({
              ...form,
              password,
            })
          }
          errorMessage={formError.password}
          secureTextEntry
        />
      </ThemedView>
      <ToggleForm
        isNew={isNew}
        setIsNew={setIsNew}
        setIsResetPassword={setIsResetPassword}
      />
      <ThemedView style={{ alignItems: "center", marginVertical: 36 }}>
        <ThemedButton
          title="Submit"
          outlined
          onPress={submit}
          loading={loading}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}
