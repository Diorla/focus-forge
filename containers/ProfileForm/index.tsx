import goBack from "@/services/routing";
import { useEffect, useState } from "react";
import useUser from "@/context/user/useUser";
import { baseForm } from "./baseForm";
import ResetConfirm from "./ResetConfirm";
import { ResetPassword } from "./ResetPassword";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export default function ProfileFormScreen() {
  const { user } = useUser();
  const [form, setForm] = useState(baseForm);
  const [formError, setFormError] = useState(baseForm);
  const [isNew, setIsNew] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetConfirmed, setResetConfirmed] = useState(false);

  useEffect(() => {
    if (user.id && user.id !== "user") goBack();
  }, [user]);

  if (resetConfirmed)
    return (
      <ResetConfirm
        setIsResetPassword={setIsResetPassword}
        setResetConfirmed={setResetConfirmed}
        setIsNew={setIsNew}
      />
    );
  if (isResetPassword)
    return (
      <ResetPassword
        form={form}
        setFormError={setFormError}
        setResetConfirmed={setResetConfirmed}
        formError={formError}
        setIsNew={setIsNew}
        setIsResetPassword={setIsResetPassword}
      />
    );
  if (isNew)
    return (
      <SignUp
        isNew={isNew}
        setIsNew={setIsNew}
        form={form}
        setFormError={setFormError}
        setForm={setForm}
        formError={formError}
        setIsResetPassword={setIsResetPassword}
      />
    );
  return (
    <SignIn
      isNew={isNew}
      setIsNew={setIsNew}
      form={form}
      setFormError={setFormError}
      setForm={setForm}
      formError={formError}
      setIsResetPassword={setIsResetPassword}
    />
  );
}
