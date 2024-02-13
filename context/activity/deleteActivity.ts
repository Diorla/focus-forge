import AsyncStorage from "@react-native-async-storage/async-storage";
import getActivity from "../../services/storage/getActivity";
import logError from "../../services/storage/logError";

export default async function deleteActivity(id: string) {
  try {
    const data = await getActivity();
    await AsyncStorage.setItem(
      id,
      JSON.stringify([...data.filter((item) => item.id !== id)])
    );
  } catch (e) {
    logError("storing activity", e);
  }
}
