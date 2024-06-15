import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function resetStorage() {
  await AsyncStorage.clear();
}
