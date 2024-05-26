import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { format } from "../../services/datetime";
import useNavigate from "../../container/Nav/useNavigate";
import useDataQuery from "../../context/data/useDataQuery";

export default function Header() {
  const navigate = useNavigate();
  const {
    user: { name, createdAt },
  } = useDataQuery();

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
        <Typography style={{ textAlign: "center" }}>
          {format(createdAt)}
        </Typography>
      </View>
    </TouchableOpacity>
  );
}
