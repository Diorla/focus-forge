import { signIn } from "../../services/auth";
import { logError } from "../../services/database";
import Form from "./Form";

export async function onSignIn(
  value: Form,
  updateError: (obj: { [key: string]: string }) => void,
  setLoading: (value: boolean) => void
) {
  setLoading(true);
  if (!value.email) {
    return updateError({ email: "Please provide an email" });
  }
  if (!value.password) {
    return updateError({ password: "Please provide password" });
  }
  try {
    await signIn(value.email, value.password);
    setLoading(false);
  } catch (error) {
    if (error.message.includes("user-not-found"))
      return updateError({ email: "User not found" });
    else if (error.message.includes("invalid-email"))
      return updateError({ email: "Please provide a valid email" });
    else if (error.message.includes("invalid-credential"))
      return updateError({
        password: "Password and email doesn't match",
      });
    else if (error.message.includes("too-many-requests"))
      return updateError({
        repassword:
          "Account disabled due to many failed login. Please reset your password",
      });
    else logError(value.email, "signing in", error);
    setLoading(false);
  }
}
