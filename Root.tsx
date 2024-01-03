import useUser from "./context/user/useUser";
import { useState } from "react";
import Onboarding from "./Onboarding";
import Form from "./container/Form";
import Registration from "./container/Registration";
import Nav from "./container/Nav";
import ActivityProvider from "./context/activity";

export default function Root() {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);

  if (user) {
    if (!user?.registered) return <Registration />;
    return (
      <ActivityProvider>
        <Nav />
      </ActivityProvider>
    );
  }
  if (showForm) return <Form />;
  return <Onboarding getStarted={() => setShowForm(true)} />;
}
