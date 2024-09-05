import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import signUp from "@/services/auth/signUp";
import { logError } from "@/services/database";
import saveUserCred from "@/services/database/saveUserCred";
import { useState } from "react";
import ErrorReader from "../ErrorReader";
import { baseForm } from "./baseForm";
import MainFormProps from "./MainFormProps";
import ToggleForm from "./ToggleForm";
import handleFormError from "./handleFormError";

export function SignUp({
  form,
  setFormError,
  setForm,
  formError,
  ...props
}: MainFormProps) {
  const [loading, setLoading] = useState(false);
  const submit = () => {
    const { email, password } = form;
    setLoading(true);
    const error = handleFormError(form, props.isNew);
    if (error) {
      setFormError(error);
      return;
    }
    signUp(email, password)
      .then(() => {
        saveUserCred(email, password);
      })
      .catch((err) => {
        setFormError({
          ...baseForm,
          repassword: ErrorReader(err.message),
        });
        setLoading(false);
        logError(email, "signing up", err);
      });

    setLoading(false);
  };

  return (
    <ParallaxScrollView name="enter">
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginVertical: 20 }}
      >
        Create Account
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
        <ThemedInput
          label="Confirm Password"
          value={form.repassword}
          onChangeText={(repassword) =>
            setForm({
              ...form,
              repassword,
            })
          }
          errorMessage={formError.repassword}
          secureTextEntry
        />
      </ThemedView>
      <ToggleForm
        isNew={props.isNew}
        setIsNew={props.setIsNew}
        setIsResetPassword={props.setIsResetPassword}
      />
      <ThemedView style={{ alignItems: "center", marginVertical: 36 }}>
        <ThemedButton title="Submit" onPress={submit} loading={loading} />
      </ThemedView>
    </ParallaxScrollView>
  );
}
