import { View, Image, TouchableOpacity } from "react-native";
import { Typography } from "../../components";
import useUser from "../../context/user/useUser";
import { format } from "../../services/date";
import { useNavigation } from "@react-navigation/native";

export default function TabHeader() {
  const {
    user: { name },
  } = useUser();

  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate("Profile" as never)}
      style={{
        padding: 8,
        flexDirection: "row",
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
        <Typography type="big">{name}</Typography>
        <Typography>{format()}</Typography>
      </View>
    </TouchableOpacity>
  );
}
