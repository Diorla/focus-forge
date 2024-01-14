import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { format } from "../../services/datetime";
import useUser from "../../context/user/useUser";
import useNavigate from "../../container/Nav/useNavigate";

export default function Header() {
  const navigate = useNavigate();
  const {
    user: { name, createdAt, email },
  } = useUser();

  return (
    <TouchableOpacity
      onPress={() => navigate("Profile")}
      style={{
        padding: 8,
        alignItems: "center",
      }}
    >
      <View>
        <Typography type="big" style={{ textAlign: "center" }}>
          {name}
        </Typography>
        <Typography style={{ textAlign: "center" }} type="caption">
          {email}
        </Typography>
        <Typography style={{ textAlign: "center" }}>
          {format(createdAt)}
        </Typography>
      </View>
    </TouchableOpacity>
  );
}
