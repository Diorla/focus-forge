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
import resetPassword from "@/services/auth/resetPassword";
import { ThemedText } from "@/components/ThemedText";
import ErrorReader from "./ErrorReader";

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
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetConfirmed, setResetConfirmed] = useState(false);

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

  if (resetConfirmed)
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
  if (isResetPassword)
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
  return (
    <ParallaxScrollView name="enter">
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginVertical: 20 }}
      >
        {isNew ? "Create Account" : "Login"}
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
          onPress={() => setIsResetPassword(true)}
          color={theme.grey0}
        />
        <ThemedButton
          title={isNew ? "Already a member?" : "New member?"}
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
