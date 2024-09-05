import app from "@/constants/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export default async function signUp(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}
