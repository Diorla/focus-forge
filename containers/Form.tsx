import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import goBack from "@/services/routing";
import ThemedInput from "@/components/ThemedInput";
import { useEffect, useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import signUp from "@/services/auth/signUp";
import signIn from "@/services/auth/signIn";
import useUser from "@/context/user/useUser";
import saveUserCred from "@/services/database/saveUserCred";
import { logError } from "@/services/database";

const ErrorReader = (message: string) => {
  if (message.includes("invalid-credential"))
    return "Email and password does not match";
  if (message.includes("email-already-in-use")) return "Email already in use";
  if (message.includes("weak-password")) return "Password is too weak";
  if (message.includes("user-not-found")) return "Email does not exist";
  if (message.includes("invalid-email")) return "Email is invalid";
  if (message.includes("too-many-requests"))
    return "Too many failed sign in, please reset password";
  return message;
};

const baseForm = {
  email: "",
  password: "",
  repassword: "",
};
export default function FormScreen() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(baseForm);

  const [formError, setFormError] = useState(baseForm);

  const [isNew, setIsNew] = useState(false);
  const theme = useThemeColor();

  const submit = () => {
    const { email, password } = form;
    setLoading(true);
    if (!form.email) {
      setFormError({
        ...baseForm,
        email: "Email is required",
      });
      return;
    }
    if (!form.password) {
      setFormError({
        ...baseForm,
        password: "Password is required",
      });
      return;
    }
    if (isNew) {
      if (form.password !== form.repassword) {
        setFormError({
          ...baseForm,
          repassword: "Password does not match",
        });
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

  useEffect(() => {
    if (user.id && user.id !== "user") goBack();
  }, [user]);

  return (
    <ParallaxScrollView name="enter">
      <ThemedView style={{ marginTop: 40 }}>
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
        {isNew && (
          <ThemedInput
            label=" Confirm Password"
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
        )}
      </ThemedView>
      <ThemedView
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 8,
        }}
      >
        <ThemedButton
          title="Forgot password"
          onPress={() => setIsNew(!isNew)}
          color={theme.grey0}
        />
        <ThemedButton
          title={isNew ? "Login" : "Create Account"}
          onPress={() => setIsNew(!isNew)}
          color={theme.primary}
        />
      </ThemedView>
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
