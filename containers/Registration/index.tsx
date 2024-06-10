import { View } from "react-native";
import { useState } from "react";
import { Input } from "@rneui/themed";
import AnimatedBackground from "../AnimatedBackground";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { QuotaForm } from "./QuotaForm";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Registration() {
  const [name, setName] = useState("");
  const [showQuotaForm, setShowQuotaForm] = useState(false);
  const theme = useThemeColor();

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
