import useUser from "./context/user/useUser";
import Onboarding from "./container/Onboarding";
import Registration from "./container/Registration";
import Nav from "./container/Nav";
import ActivityProvider from "./context/activity";
import { useState } from "react";

export default function Root() {
  const { user } = useUser();
  const [register, setRegister] = useState(false);

  if (!user?.name)
    return register ? (
      <Registration />
    ) : (
      <Onboarding switchRegister={() => setRegister(true)} />
    );
  return (
    <ActivityProvider>
      <Nav />
    </ActivityProvider>
  );
}
