import { initialUser } from "@/context/user/initialUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getUserCred() {
  const data = await AsyncStorage.getItem("@userCred");
  if (data) {
    return JSON.parse(data!);
  }
  return initialUser;
}
