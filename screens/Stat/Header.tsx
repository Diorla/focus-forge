import { useTheme } from "@rneui/themed";
import * as React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { format } from "../../services/datetime";
import useUser from "../../context/user/useUser";
import useNavigate from "../../container/Nav/useNavigate";

export default function Header() {
  const navigate = useNavigate();
  const {
    user: { name },
  } = useUser();

  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => navigate("Profile")}
      style={{
        padding: 8,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/logo.png")}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          marginHorizontal: 20,
        }}
      />
      <View>
        <Typography
          type="big"
          color={theme.colors.white}
          style={{ textAlign: "center" }}
        >
          {name}
        </Typography>
        <Typography color={theme.colors.white} style={{ textAlign: "center" }}>
          {format()}
        </Typography>
      </View>
    </TouchableOpacity>
  );
}
