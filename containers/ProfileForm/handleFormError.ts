import { baseForm } from "./baseForm";
import FormProps from "./FormProps";

export default function handleFormError(form: FormProps, isNew: boolean) {
  if (!form.email) {
    return {
      ...baseForm,
      email: "Email is required",
    };
  }
  if (!form.password) {
    return {
      ...baseForm,
      password: "Password is required",
    };
  }
  if (isNew) {
    if (form.password !== form.repassword) {
      return {
        ...baseForm,
        repassword: "Password does not match",
      };
    }
  }
  return null;
}
