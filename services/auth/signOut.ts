import { getAuth, signOut as signOutFB } from "firebase/auth";
import app from "../../constants/firebaseConfig";

const auth = getAuth(app);

export default async function signOut() {
  return signOutFB(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((err) => console.log(err));
}
