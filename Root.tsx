import { Input } from "@rneui/themed";
import useUser from "./context/user/useUser";
import { ScrollView, Text, View } from "react-native";
import { useState } from "react";
import Button from "./components/button";
import { signIn, signOut, signUp } from "./services/auth";
import Onboarding from "./Onboarding";

export default function Root() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const { user } = useUser();
  const { email, password } = value;
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
  if (showForm)
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: 100,
          }}
        >
          <Input
            value={value.email}
            onChangeText={(email) =>
              setValue({
                ...value,
                email,
              })
            }
          />
          <Input
            value={value.password}
            onChangeText={(password) =>
              setValue({
                ...value,
                password,
              })
            }
          />
          <Button
            title="Sign up"
            onPress={() => signUp(email, password)}
            disabled={!(email && password)}
          />
          <Button
            title="Sign in"
            onPress={() => signIn(email, password)}
            disabled={!(email && password)}
          />
        </View>
        <Text>Sign in here</Text>
      </ScrollView>
    );
  return <Onboarding getStarted={() => setShowForm(true)} />;
}
