import { View, Image } from "react-native";
import Typography from "../../components/typography";
import { useState } from "react";
import Button from "../../components/button";
import { resetPassword } from "../../services/auth";
import { Input } from "@rneui/themed";

export default function ForgetPassword({ closePassword }: { closePassword }) {
  const [resetComplete, setResetComplete] = useState(false);
  const [email, setEmail] = useState("");
  if (resetComplete)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/mail.png")}
            style={{
              height: 150,
              width: 150,
            }}
          />
        </View>
        <Typography style={{ textAlign: "center" }} type="bigHeader">
          Check your mail
        </Typography>
        <Typography style={{ marginVertical: 30, padding: 8 }}>
          We have sent password recovery instructions to your email
        </Typography>
        <View style={{ paddingHorizontal: 30 }}>
          <Button onPress={closePassword}>Back to login</Button>
        </View>
      </View>
    );
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View />
      <View>
        <Input
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="example@email.com"
          containerStyle={{
            marginTop: 60,
          }}
          rightIcon={{
            type: "ion",
            name: "mail",
          }}
        />

        <View style={{ paddingHorizontal: 30 }}>
          <Button
            title="Reset Password"
            onPress={() =>
              resetPassword(email).then(() => setResetComplete(true))
            }
            disabled={!email}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
        <Button onPress={closePassword}>Back to login</Button>
      </View>
    </View>
  );
}
