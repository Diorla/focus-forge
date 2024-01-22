import { Input, useTheme } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Button from "../../components/button";
import { signIn, signUp } from "../../services/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../../components/typography";
import ForgetPassword from "./ForgetPassword";
import { logError } from "../../services/database";

export default function Form() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const [isNew, setIsNew] = useState(true);
  const { email, password } = value;
  const [hidePassword, setHidePassword] = useState({
    password: true,
    repassword: true,
  });

  const [loading, setLoading] = useState(false);
  const message = isNew ? "sign up" : "sign in";
  const {
    theme: { colors },
  } = useTheme();

  const [forgetPassword, setForgetPassword] = useState(false);

  const onSignUp = async () => {
    setLoading(true);
    if (!value.email) {
      return setError({ ...error, email: "Please provide an email" });
    }
    if (!value.password) {
      return setError({ ...error, password: "Please provide a password" });
    }
    if (value.password !== value.repassword) {
      return setError({ ...error, repassword: "Passwords do not match" });
    }
    try {
      await signUp(value.email, value.password);
      setLoading(false);
    } catch (error) {
      if (error.message.includes("invalid-email"))
        return setError({
          ...error,
          email: "Please provide a valid email",
        });
      setLoading(false);
    }
  };

  const onSignIn = async () => {
    setLoading(true);
    if (!value.email) {
      return setError({ ...error, email: "Please provide an email" });
    }
    if (!value.password) {
      return setError({ ...error, password: "Please provide password" });
    }
    try {
      await signIn(value.email, value.password);
      setLoading(false);
    } catch (error) {
      if (error.message.includes("user-not-found"))
        return setError({ ...error, email: "User not found" });
      else if (error.message.includes("invalid-email"))
        return setError({ ...error, email: "Please provide a valid email" });
      else if (error.message.includes("invalid-credential"))
        return setError({
          ...error,
          password: "Password and email doesn't match",
        });
      else if (error.message.includes("too-many-requests"))
        return setError({
          ...error,
          repassword:
            "Account disabled due to many failed login. Please reset your password",
        });
      else logError(value.email, "signing in", error);
      setLoading(false);
    }
  };

  if (forgetPassword)
    return <ForgetPassword closePassword={() => setForgetPassword(false)} />;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ marginTop: 18, marginLeft: 6 }}>
        <MaterialCommunityIcons
          name="timer-sand-paused"
          size={24}
          color="black"
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 8,
        }}
      >
        <Typography style={{ marginTop: 60 }} type="bigHeader">
          Hi
        </Typography>
        <Typography type="big" style={{ marginBottom: 60 }}>
          Please {message} to continue
        </Typography>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => setIsNew(!isNew)} disabled={isNew}>
            <Typography
              style={{
                color: !isNew ? colors.black : colors.grey4,
              }}
            >
              New User
            </Typography>
          </TouchableOpacity>
          <Typography style={{ marginHorizontal: 8 }}>/</Typography>
          <TouchableOpacity onPress={() => setIsNew(!isNew)} disabled={!isNew}>
            <Typography
              style={{
                color: isNew ? colors.black : colors.grey4,
              }}
            >
              Member
            </Typography>
          </TouchableOpacity>
        </View>
        <Input
          label="Email"
          value={value.email}
          onChangeText={(email) =>
            setValue({
              ...value,
              email,
            })
          }
          placeholder="example@email.com"
          containerStyle={{
            marginTop: 60,
          }}
          rightIcon={{
            type: "ion",
            name: "mail",
          }}
        />
        <Input
          label="Password"
          value={value.password}
          onChangeText={(password) =>
            setValue({
              ...value,
              password,
            })
          }
          placeholder="********"
          rightIcon={{
            type: "material-community",
            name: hidePassword.password ? "eye" : "eye-off",
            onPress: () =>
              setHidePassword({
                ...hidePassword,
                password: !hidePassword.password,
              }),
          }}
          secureTextEntry={hidePassword.password}
        />
        {isNew ? (
          <Input
            label="Confirm Password"
            value={value.repassword}
            onChangeText={(repassword) =>
              setValue({
                ...value,
                repassword,
              })
            }
            placeholder="********"
            rightIcon={{
              type: "material-community",
              name: hidePassword.repassword ? "eye" : "eye-off",
              onPress: () =>
                setHidePassword({
                  ...hidePassword,
                  repassword: !hidePassword.repassword,
                }),
            }}
            secureTextEntry={hidePassword.repassword}
          />
        ) : (
          <TouchableOpacity onPress={() => setForgetPassword(!forgetPassword)}>
            <Typography>Forget Password</Typography>
          </TouchableOpacity>
        )}

        <View style={{ marginTop: 40, paddingHorizontal: 30 }}>
          {isNew ? (
            <Button
              title="Sign up"
              onPress={onSignUp}
              disabled={!(email && password)}
              loading={loading}
            />
          ) : (
            <Button
              title="Sign in"
              onPress={onSignIn}
              disabled={!(email && password)}
              loading={loading}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
