import { View } from "react-native";
import { useEffect, useState } from "react";
import { Input } from "@rneui/themed";
import AnimatedBackground from "../AnimatedBackground";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import QuotaForm from "./QuotaForm";
import { useThemeColor } from "@/hooks/useThemeColor";
import useUser from "@/context/user/useUser";
import { router } from "expo-router";
import FormContainer from "../Form";
import updateUser from "@/services/database/updateUser";

export default function Registration() {
  const [name, setName] = useState("");
  const theme = useThemeColor();
  const { user } = useUser();

  useEffect(() => {
    if (user.registered) {
      router.push("/");
    }
  }, [user]);

  if (!user.id) return <FormContainer />;

  if (user.name) return <QuotaForm />;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AnimatedBackground prevColor={theme.background} externalKey="primary" />
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          backgroundColor: "transparent",
        }}
      >
        <View style={{ alignItems: "center" }}></View>
        <View style={{ padding: 8 }}>
          <ThemedText
            type="title"
            style={{
              textAlign: "center",
              marginBottom: 40,
              color: theme.background,
            }}
          >
            Hello, What should I call you?
          </ThemedText>
          <Input
            value={name}
            onChangeText={(name) => setName(name)}
            style={{ color: theme.background, textAlign: "center" }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedButton
              title="Continue"
              color={theme.background}
              disabled={name.length <= 2}
              onPress={() => {
                updateUser({ name: name.trim(), id: user.id });
              }}
            />
          </View>
        </View>
        <View />
      </View>
    </View>
  );
}
