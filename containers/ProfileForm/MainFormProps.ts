import { Dispatch, SetStateAction } from "react";
import FormProps from "./FormProps";

export default interface MainFormProps {
  isNew: boolean;
  form: FormProps;
  setFormError: Dispatch<SetStateAction<FormProps>>;
  setForm: Dispatch<SetStateAction<FormProps>>;
  formError: FormProps;
  setIsNew: Dispatch<SetStateAction<boolean>>;
  setIsResetPassword: Dispatch<SetStateAction<boolean>>;
}
