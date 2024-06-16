import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import UserModel from "./UserModel";
import { initialUser } from "./initialUser";
import { onAuthStateChanged, Unsubscribe, Auth, getAuth } from "firebase/auth";
import app from "@/constants/firebaseConfig";
import { logError } from "@/services/database";
import watchUser from "@/services/database/watchUser";
import getUserCred from "@/services/database/getUserCred";
import signIn from "@/services/auth/signIn";

const generateAuth = () => {
  return getAuth(app);
};
const auth = getAuth(app);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserModel>(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth as Auth, (currentUser) => {
        if (currentUser) {
          watchUser(currentUser.uid, (user) => {
            setUser({ ...user, id: currentUser.uid });
            setLoading(false);
          });
        } else {
          getUserCred().then((userCred) => {
            if (userCred.email) {
              signIn(userCred.email, userCred.password);
            } else {
              setLoading(false);
            }
          });
        }
      });
    } catch (error) {
      logError(user?.id, "auth user context", error as Error);
      setLoading(false);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user?.id]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}
