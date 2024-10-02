import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import SettingsItem from "@/components/SettingsItem";
import useUser from "@/context/user/useUser";
import Confirm from "@/components/Confirm";
import signOut from "@/services/auth/signOut";
import removeUserCred from "@/services/database/removeUserCred";
import * as WebBrowser from "expo-web-browser";
import { Icon, ListItem } from "@rneui/themed";

/**
 * Help centre
 * Privacy policy
 * Rate us
 * Reset data
 * @returns
 */
export default function AccountScreen() {
  const { user, theme } = useUser();

  const isLoggedIn = user.id !== "user";
  const { background } = theme;

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://buymeacoffee.com/diorla"
    );
    return result;
  };

  return (
    <ParallaxScrollView name="person">
      <ThemedView style={{ margin: 8, backgroundColor: background }}>
        {isLoggedIn && (
          <>
            <SettingsItem
              path="profile"
              title="Profile"
              icon="user"
              iconType="feather"
            />
            <SettingsItem
              path="password"
              title="Change password"
              icon="keypad"
            />
            {/* <SettingsItem
              path="subscription"
              title="Subscription"
              icon="star"
            /> */}
          </>
        )}
        {/* <SettingsItem path="stat" title="Stat" icon="stats-chart" />
        <SettingsItem path="help" title="Help" icon="help" />
        <SettingsItem
          path="history"
          title="History"
          icon="history"
          iconType="material"
        /> */}
        <SettingsItem
          path="settings"
          title="Settings"
          icon="settings"
          iconType="feather"
        />
        <ListItem onPress={_handlePressButtonAsync}>
          <Icon name="coffee" type="feather" />
          <ListItem.Content>
            <ListItem.Title>Buy me a coffee</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {isLoggedIn ? (
          <>
            <Confirm
              title="Log out"
              message="You will not be able to use the app while logged out"
              acceptFn={() => removeUserCred().then(() => signOut())}
            >
              <ListItem>
                <Icon name="log-out" type="feather" />
                <ListItem.Content>
                  <ListItem.Title>Log out</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </Confirm>
          </>
        ) : (
          <SettingsItem
            path="form"
            title="Login"
            icon="log-in"
            iconType="feather"
          />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}
