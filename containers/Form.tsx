import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import ThemedInput from "@/components/ThemedInput";
import { useEffect, useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import signIn from "@/services/auth/signIn";
import useUser from "@/context/user/useUser";
import sync from "@/services/storage/sync";

export default function FormContainer({
  closeScreen,
}: {
  closeScreen: () => void;
}) {
  const { updateUser, user } = useUser();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

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

    signIn(email, password)
      .then((auth) => {
        console.log("hello sign in");
        sync(auth.user.uid).then((value) => {
          const { user } = value;
          updateUser({ ...user, id: auth.user.uid });
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user.id && user.id !== "user") router.push("/");
  }, [user]);

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
          secureTextEntry
        />
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
          onPress={() => console.log("forgot password")}
          color={theme.grey0}
        />
      </ThemedView>
      <ThemedView style={{ alignItems: "center", marginVertical: 12 }}>
        <ThemedButton title="Submit" outlined onPress={submit} />
      </ThemedView>
      <ThemedView style={{ alignItems: "center", marginTop: 40 }}>
        <ThemedButton title="Back" onPress={() => closeScreen()} />
      </ThemedView>
    </ParallaxScrollView>
  );
}
