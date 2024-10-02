import { getAuth, signOut as signOutFB } from "firebase/auth";
import app from "@/constants/firebaseConfig";
import removeUserCred from "../database/removeUserCred";

const auth = getAuth(app);

export default async function signOut() {
  return signOutFB(auth)
    .then(() => {
      removeUserCred();
    })
    .catch((err) => console.log(err));
}
