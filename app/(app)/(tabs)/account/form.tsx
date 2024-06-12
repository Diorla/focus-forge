import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import ThemedInput from "@/components/ThemedInput";
import { useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import signUp from "@/services/auth/signUp";
import signIn from "@/services/auth/signIn";
import useUser from "@/context/user/useUser";

export default function FormScreen() {
  const { updateUser } = useUser();
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
        .then((auth) => updateUser({ id: auth.user.uid }))
        .then(() => router.back())
        .catch((err) => console.log(err));
    }
    signIn(email, password)
      .then((auth) => updateUser({ id: auth.user.uid }))
      .then(() => router.back())
      .catch((err) => console.log(err));
  };

  return (
    <ParallaxScrollView name="enter">
      <ThemedText
        type="defaultSemiBold"
        style={{ textAlign: "center", marginVertical: 8 }}
      >
        Join us to sync data online
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
      <ThemedView style={{ alignItems: "center", marginVertical: 12 }}>
        <ThemedButton title="Submit" outlined onPress={submit} />
      </ThemedView>
      <ThemedView style={{ alignItems: "center", marginTop: 40 }}>
        <ThemedButton title="Back" onPress={() => router.back()} />
      </ThemedView>
    </ParallaxScrollView>
  );
}
