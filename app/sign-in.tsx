import Onboarding from "@/containers/Onboarding";
import Registration from "@/containers/Registration";
import { useState } from "react";

export default function SignIn() {
  const [isRegistering, setIsRegistering] = useState(false);
  return isRegistering ? (
    <Registration />
  ) : (
    <Onboarding switchRegister={() => setIsRegistering(!isRegistering)} />
  );
}
