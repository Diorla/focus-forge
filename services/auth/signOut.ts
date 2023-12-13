import { getAuth, signOut as signOutFB } from "firebase/auth";
import app from "../../constants/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth(app);

export default async function signOut() {
  return signOutFB(auth)
    .then(() => {
      console.log("signed out");
      AsyncStorage.clear();
    })
    .catch((err) => console.log(err));
}

/*
import AsyncStorage from "@react-native-async-storage/async-storage";
import logError from "../services/logError";

export default async function clearCredential() {
  try {
    await AsyncStorage.removeItem("auth");
  } catch (err) {
    logError("", "removing local data", err);
  }
}
*/
