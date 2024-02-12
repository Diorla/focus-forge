import { View, Image, TouchableOpacity } from "react-native";
import SectionHeader from "./SectionHeader";
import { Typography } from "../../components";
import { Fontisto } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import useUser from "../../context/user/useUser";

const Banner = () => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../../assets/daily.png")}
      />
      <View style={{ flex: 1 }}>
        <Typography type="header">Title</Typography>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Fontisto name="star" size={18} color={colors.warning} />
          <Fontisto name="star" size={18} color={colors.warning} />
          <Fontisto name="star" size={18} color={colors.warning} />
          <Fontisto name="star" size={18} color={colors.warning} />
          <Fontisto name="star-half" size={18} color={colors.warning} />
        </View>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "green",
            marginRight: 2,
          }}
        >
          <Typography
            type="header"
            style={{
              color: "white",
              paddingHorizontal: 6,
              paddingVertical: 10,
            }}
          >
            Install Now
          </Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function AdsView() {
  const { user } = useUser();
  // Premium members will not see ads
  const isPremium = user.email === "adedotster";
  if (isPremium) return null;
  return (
    <View>
      <SectionHeader title="Promotions" />
      <View>
        <Banner />
      </View>
    </View>
  );
}
