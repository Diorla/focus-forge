import { Input } from "@rneui/themed";
import useUser from "./context/user/useUser";
import { ScrollView, Text, View } from "react-native";
import { useState } from "react";
import Button from "./components/button";
import { signOut } from "./services/auth";
import Onboarding from "./Onboarding";
import Form from "./container/Form";

export default function Root() {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);

  if (user) {
    if (!user?.name)
      return (
        <View style={{ marginTop: 30 }}>
          <Text>Add name here</Text>
          <Button title="Sign out" color="error" onPress={signOut} />
        </View>
      );
    return (
      <View style={{ flex: 1 }}>
        <Text>Welcome user</Text>
      </View>
    );
  }
  if (showForm) return <Form />;
  return <Onboarding getStarted={() => setShowForm(true)} />;
}
