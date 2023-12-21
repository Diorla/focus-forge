import { Input } from "@rneui/themed";
import useUser from "./context/user/useUser";
import { ScrollView, Text, View } from "react-native";
import { useState } from "react";
import Button from "./components/button";
import { signOut } from "./services/auth";
import Onboarding from "./Onboarding";
import Form from "./container/Form";
import Registration from "./container/Registration";
import Nav from "./container/Nav";

export default function Root() {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);

  if (user) {
    if (!user?.registered) return <Registration />;
    return <Nav />;
  }
  if (showForm) return <Form />;
  return <Onboarding getStarted={() => setShowForm(true)} />;
}
