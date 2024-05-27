import { ScrollView, View } from "react-native";
import Header from "./Header";
import { Button } from "../../components";
import { ListItem, useTheme } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import useNavigate from "../../container/Nav/useNavigate";
import Item from "./Item";
import Confirm from "../../components/confirm";
import { loadDB, logError, uploadDB } from "../../services/database";
import { useToast } from "react-native-toast-notifications";
import useDataQuery from "../../context/data/useDataQuery";
import storeUser from "../../services/storage/storeUser";
import storeActivityList from "../../services/storage/storeActivityList";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {
    deleteUser,
    user: { id = "userID" },
    restartDB,
  } = useDataQuery();
  const toast = useToast();
  return (
    <ScrollView>
      <Header />
      <View style={{ padding: 8 }}>
        <Button onPress={() => navigate("EditProfile")}>Edit</Button>
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
          <Ionicons name="help" size={24} color={theme.colors.black} />
        </Item>
        <Item title="Privacy policy" onPress={() => navigate("PrivacyPolicy")}>
          <AntDesign name="eye" size={24} color={theme.colors.black} />
        </Item>
        <Item
          title="Change password"
          onPress={() => navigate("ChangePassword")}
        >
          <Ionicons name="keypad-sharp" size={24} color={theme.colors.black} />
        </Item>
        <Item title="Settings" onPress={() => navigate("Settings")}>
          <Ionicons name="settings" size={24} color={theme.colors.black} />
        </Item>
        <Item title="Rate us" onPress={() => navigate("RateUs")}>
          <AntDesign name="star" size={24} color={theme.colors.black} />
        </Item>
        <Confirm
          title="Back up"
          message="This will override your remote storage, do you wish to continue?"
          acceptFn={() => {
            uploadDB(id);
            toast.show("Database uploaded");
          }}
        >
          <Item title="Export" onPress={null}>
            <AntDesign name="star" size={24} color={theme.colors.black} />
          </Item>
        </Confirm>
        <Confirm
          title="Import from server"
          message="This will override your local storage, do you wish to continue?"
          acceptFn={() => {
            try {
              loadDB(id)
                .then((value) => {
                  const { user, activityList } = JSON.parse(value);
                  storeUser(user);
                  storeActivityList(activityList);
                })
                .then(restartDB)
                .then(() => toast.show("Database loaded"));
            } catch (error) {
              logError("reloading DB", "profile", error);
            }
          }}
        >
          <Item title="Import" onPress={null}>
            <AntDesign name="star" size={24} color={theme.colors.black} />
          </Item>
        </Confirm>
        <Confirm
          title="Reset data"
          message="This will delete all your data. You cannot reverse this process, you can back up the data for future use"
          acceptFn={() => deleteUser()}
          acceptTitle="Delete"
        >
          <ListItem>
            <Feather name="log-out" size={24} color={theme.colors.black} />
            <ListItem.Content>
              <ListItem.Title>Reset data</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </Confirm>
        <ListItem>
          <Feather name="log-in" size={24} color={theme.colors.black} />
          <ListItem.Content>
            <ListItem.Title>Log in/log out</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </ScrollView>
  );
}
