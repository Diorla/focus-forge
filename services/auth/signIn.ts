import app from "@/constants/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export default async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}
