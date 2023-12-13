import { Input } from "@rneui/themed";
import useUser from "./context/user/useUser";
// import Welcome from "./screens/Welcome";
// import Form from "./views/form";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Button from "./components/button";
import { signIn, signOut, signUp } from "./services/auth";

export default function Root() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const { user } = useUser();

  const { email, password } = value;

  if (user) {
    if (!user.name)
      return (
        <View>
          <Text>Add name here</Text>
          <Button title="Sign out" onPress={signOut} />
        </View>
      );
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Welcome user</Text>
      </SafeAreaView>
    );
  }
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
}
