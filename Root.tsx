import useUser from "./context/user/useUser";
import Onboarding from "./container/Onboarding";
import Registration from "./container/Registration";
import Nav from "./container/Nav";
import ActivityProvider from "./context/activity";

export default function Root() {
  const { user } = useUser();

  if (user) {
    if (!user?.name) return <Registration />;
    return (
      <ActivityProvider>
        <Nav />
      </ActivityProvider>
    );
  }
  return <Onboarding />;
}
