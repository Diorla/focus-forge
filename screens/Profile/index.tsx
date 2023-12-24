import { ScrollView, View } from "react-native";
import Header from "./Header";
import { Button } from "../../components";
import { ListItem, useTheme } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import useNavigate from "../../container/Nav/useNavigate";
import { signOut } from "../../services/auth";

const Item = ({
  title,
  children,
  onPress,
}: {
  title: string;
  children: React.ReactNode;
  onPress: () => void;
}) => {
  return (
    <ListItem onPress={onPress}>
      {children}
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};
export default function ProfileScreen() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  return (
    <ScrollView>
      <Header />
      <View style={{ padding: 8 }}>
        <Button onPress={() => navigate("EditProfile")}>Edit Profile</Button>
      </View>
      <View style={{ marginVertical: 20 }}>
        <ListItem onPress={() => navigate("Subscription")}>
          <FontAwesome5 name="crown" size={24} color="gold" />
          <ListItem.Content>
            <ListItem.Title>Subscription</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <Item title="Help centre" onPress={() => navigate("HelpCentre")}>
          <Ionicons
            name="md-help-circle"
            size={24}
            color={theme.colors.black}
          />
        </Item>
        <Item title="Privacy policy" onPress={() => navigate("PrivacyPolicy")}>
          <AntDesign name="eye" size={24} color={theme.colors.black} />
        </Item>
        <Item title="Settings" onPress={() => navigate("Settings")}>
          <Ionicons name="settings" size={24} color={theme.colors.black} />
        </Item>
        <Item title="Rate us" onPress={() => navigate("RateUs")}>
          <AntDesign name="star" size={24} color={theme.colors.black} />
        </Item>
        <ListItem onPress={() => signOut()}>
          <Feather name="log-out" size={24} color={theme.colors.black} />
          <ListItem.Content>
            <ListItem.Title>Log out</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </ScrollView>
  );
}
