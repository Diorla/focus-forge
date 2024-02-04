import { Input, useTheme } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Button from "../../components/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../../components/typography";
import ForgetPassword from "./ForgetPassword";
import { onSignUp } from "./onSignUp";
import { onSignIn } from "./onSignIn";
import KeyboardWrapper from "../KeyboardWrapper";

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

  const [isNew, setIsNew] = useState(false);
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

  const updateError = (obj: { key: string; value: string }) => {
    setError({ ...error, ...obj });
  };

  if (forgetPassword)
    return <ForgetPassword closePassword={() => setForgetPassword(false)} />;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardWrapper>
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
            <TouchableOpacity
              onPress={() => setIsNew(!isNew)}
              disabled={!isNew}
            >
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
            <TouchableOpacity
              onPress={() => setForgetPassword(!forgetPassword)}
            >
              <Typography>Forget Password</Typography>
            </TouchableOpacity>
          )}

          <View style={{ marginTop: 40, paddingHorizontal: 30 }}>
            {isNew ? (
              <Button
                title="Sign up"
                onPress={() => onSignUp(value, updateError, setLoading)}
                disabled={!(email && password)}
                loading={loading}
              />
            ) : (
              <Button
                title="Sign in"
                onPress={() => onSignIn(value, updateError, setLoading)}
                disabled={!(email && password)}
                loading={loading}
              />
            )}
          </View>
        </View>
      </KeyboardWrapper>
    </ScrollView>
  );
}
