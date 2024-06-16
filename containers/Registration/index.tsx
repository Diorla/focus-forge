import { View } from "react-native";
import { useEffect, useState } from "react";
import { Input } from "@rneui/themed";
import AnimatedBackground from "../AnimatedBackground";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { QuotaForm } from "./QuotaForm";
import { useThemeColor } from "@/hooks/useThemeColor";
import useUser from "@/context/user/useUser";
import { router } from "expo-router";
import FormContainer from "../Form";

export default function Registration() {
  const [name, setName] = useState("");
  const [showQuotaForm, setShowQuotaForm] = useState(false);
  const theme = useThemeColor();
  const { user } = useUser();

  useEffect(() => {
    if (user.registered) {
      router.push("/");
    }
  }, [user]);

  if (!user.id) return <FormContainer />;

  if (showQuotaForm) return <QuotaForm name={name} />;
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
                setShowQuotaForm(true);
              }}
            />
          </View>
        </View>
        <View />
      </View>
    </View>
  );
}
