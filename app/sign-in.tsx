import FormContainer from "@/containers/Form";
import Onboarding from "@/containers/Onboarding";
import Registration from "@/containers/Registration";
import { useState } from "react";

export default function SignIn() {
  const [route, setRoute] = useState<"onboarding" | "register" | "login">(
    "onboarding"
  );
  if (route === "onboarding")
    return <Onboarding switchRegister={(value) => setRoute(value)} />;
  if (route === "register") return <Registration />;
  if (route === "login")
    return <FormContainer closeScreen={() => setRoute("onboarding")} />;
}
