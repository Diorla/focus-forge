import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../constants/firebaseConfig";

const auth = getAuth(app);

export default async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}
