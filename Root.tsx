import Onboarding from "./container/Onboarding";
import Registration from "./container/Registration";
import Nav from "./container/Nav";
import ScheduleProvider from "./context/schedule";
import { useState } from "react";
import useDataQuery from "./context/data/useDataQuery";

export default function Root() {
  const { user } = useDataQuery();
  const [register, setRegister] = useState(false);

  if (!user?.name)
    return register ? (
      <Registration />
    ) : (
      <Onboarding switchRegister={() => setRegister(true)} />
    );
  return (
    <ScheduleProvider>
      <Nav />
    </ScheduleProvider>
  );
}
