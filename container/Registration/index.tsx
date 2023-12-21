import { View } from "react-native";
import AnimatedBackground from "../../AnimatedBackground";
import { useState } from "react";
import Typography from "../../components/typography";
import { Input, useTheme } from "@rneui/themed";
import Button from "../../components/button";
import { QuotaForm } from "./QuotaForm";

export default function Registration() {
  const {
    theme: { colors },
  } = useTheme();
  const [name, setName] = useState("");
  const [showQuotaForm, setShowQuotaForm] = useState(false);

  if (showQuotaForm) return <QuotaForm name={name} />;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AnimatedBackground prevColor="white" externalKey="primary" />
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          backgroundColor: "transparent",
        }}
      >
        <View style={{ alignItems: "center" }}></View>
        <View style={{ padding: 8 }}>
          <Typography
            color={colors.white}
            type="header"
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            Hello, What should I call you?
          </Typography>
          <Input
            value={name}
            onChangeText={(name) => setName(name)}
            style={{ color: colors.white, textAlign: "center" }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              block
              disabled={name.length <= 2}
              onPress={() => {
                setShowQuotaForm(true);
              }}
            >
              Continue
            </Button>
          </View>
        </View>
        <View />
      </View>
    </View>
  );
}
