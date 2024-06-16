import Onboarding from "@/containers/Onboarding";
import Registration from "@/containers/Registration";
import { useState } from "react";

export default function SignIn() {
  const [route, setRoute] = useState<"onboarding" | "register">("onboarding");
  if (route === "onboarding")
    return <Onboarding switchRegister={(value) => setRoute(value)} />;
  return <Registration />;
}
