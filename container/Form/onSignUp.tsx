import { signUp } from "../../services/auth";
import Form from "./Form";

export async function onSignUp(
  value: Form,
  updateError: (obj: { [key: string]: string }) => void,
  setLoading: (value: boolean) => void
) {
  setLoading(true);
  if (!value.email) {
    return updateError({ email: "Please provide an email" });
  }
  if (!value.password) {
    return updateError({ password: "Please provide a password" });
  }
  if (value.password !== value.repassword) {
    return updateError({ repassword: "Passwords do not match" });
  }
  try {
    await signUp(value.email, value.password);
    setLoading(false);
  } catch (error) {
    if (error.message.includes("invalid-email"))
      return updateError({
        ...error,
        email: "Please provide a valid email",
      });
    setLoading(false);
  }
}
