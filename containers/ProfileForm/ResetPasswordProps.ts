import { Dispatch, SetStateAction } from "react";
import FormProps from "./FormProps";

export default interface ResetPasswordProps {
  form: FormProps;
  setFormError: Dispatch<SetStateAction<FormProps>>;
  setResetConfirmed: Dispatch<SetStateAction<boolean>>;
  formError: FormProps;
  setIsNew: Dispatch<SetStateAction<boolean>>;
  setIsResetPassword: Dispatch<SetStateAction<boolean>>;
}
