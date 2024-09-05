import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function removeUserCred() {
  return AsyncStorage.removeItem("@userCred");
}
