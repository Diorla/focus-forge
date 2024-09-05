import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveUserCred(email: string, password: string) {
  return AsyncStorage.setItem("@userCred", JSON.stringify({ email, password }));
}
