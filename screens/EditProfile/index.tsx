import { Input } from "@rneui/themed";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import useUser from "../../context/user/useUser";
import { useState } from "react";
import { QuotaForm } from "./QuotaForm";
import { Button } from "../../components";
import { updateUser } from "../../services/database";
import { useToast } from "react-native-toast-notifications";

export default function EditProfileScreen() {
  const { user } = useUser();

  const [form, setForm] = useState({
    ...user,
  });

  const toast = useToast();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ paddingTop: 16 }}>
        <View style={{ marginBottom: 48 }}>
          <Input
            label="Name"
            value={form.name}
            onChangeText={(name) => setForm({ ...form, name })}
          />
          <QuotaForm
            form={form}
            setForm={(value) => setForm({ ...form, ...value })}
          />
          <Button
            onPress={() =>
              updateUser(user).then(() =>
                toast.show("Profile updated", { type: "success" })
              )
            }
          >
            Save
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
