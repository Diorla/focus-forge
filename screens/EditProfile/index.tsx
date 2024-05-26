import { Input } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import { useState } from "react";
import { QuotaForm } from "./QuotaForm";
import { Button } from "../../components";
import { useToast } from "react-native-toast-notifications";
import KeyboardWrapper from "../../container/KeyboardWrapper";
import useDataQuery from "../../context/data/useDataQuery";

export default function EditProfileScreen() {
  const { user, updateUser } = useDataQuery();

  const [form, setForm] = useState({
    ...user,
  });

  const toast = useToast();

  return (
    <KeyboardWrapper>
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
            onPress={() => {
              updateUser(form);
              toast.show("Profile updated", { type: "success" });
            }}
          >
            Save
          </Button>
        </View>
      </ScrollView>
    </KeyboardWrapper>
  );
}
