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
import { Dimensions, View } from "react-native";

const auth = getAuth(app);

const maxWidth = 720;
const getMarginLeft = (width: number) => {
  const left = (Dimensions.get("window").width - width) / 2;
  if (left < 0) return 0;
  return left;
};
export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserModel>(initialUser);
  const [loading, setLoading] = useState(true);
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", () => {
      setMarginLeft(getMarginLeft(maxWidth));
    });
    return () => subscription?.remove();
  });

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth as Auth, (currentUser) => {
        if (currentUser) {
          watchUser(currentUser.uid, (user) => {
            setUser({ ...initialUser, ...user, id: currentUser.uid });
            setLoading(false);
          });
        } else {
          getUserCred().then((userCred) => {
            if (userCred.email) {
              signIn(userCred.email, userCred.password);
            } else {
              setUser(initialUser);
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
      <View style={{ maxWidth, marginLeft }}>
        <View
          style={{
            minHeight: Dimensions.get("window").height,
            maxWidth: "100%",
            flex: 1,
            alignItems: "stretch",
          }}
        >
          {children}
        </View>
      </View>
    </UserContext.Provider>
  );
}
