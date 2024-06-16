import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import ThemedInput from "@/components/ThemedInput";
import { useEffect, useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import signUp from "@/services/auth/signUp";
import signIn from "@/services/auth/signIn";
import useUser from "@/context/user/useUser";
import saveUserCred from "@/services/database/saveUserCred";

export default function FormScreen() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const [isNew, setIsNew] = useState(false);
  const theme = useThemeColor();

  const submit = () => {
    const { email, password } = form;
    setLoading(true);
    if (!form.email) {
      setFormError({
        ...formError,
        email: "Email is required",
      });
      return;
    }
    if (!form.password) {
      setFormError({
        ...formError,
        password: "Password is required",
      });
      return;
    }
    if (isNew) {
      if (form.password !== form.repassword) {
        setFormError({
          ...formError,
          repassword: "Password does not match",
        });
        return;
      }
      signUp(email, password)
        .then(() => {
          saveUserCred(email, password);
        })
        .catch((err) => console.log(err));
    }
    signIn(email, password)
      .then(() => {
        saveUserCred(email, password);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  useEffect(() => {
    if (user.id && user.id !== "user") router.back();
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
