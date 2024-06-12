import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import getUser from "@/services/storage/getUser";
import removeUser from "@/services/storage/removeUser";
import saveUser from "@/services/storage/saveUser";
import storeUser from "@/services/storage/storeUser";
import UserModel from "../data/model/UserModel";
import { initialUser } from "./initialUser";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserModel>(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const createUser = (user: UserModel) => {
    storeUser(user);
    setUser(user);
  };

  const updateUser = (value: Partial<UserModel>) => {
    saveUser({ ...user, ...value, updatedAt: Date.now() }).then((user) => {
      setUser(user);
    });
  };

  const deleteUser = () => {
    removeUser().then(() => {
      setUser(initialUser);
    });
  };

  return (
    <UserContext.Provider
      value={{ createUser, deleteUser, updateUser, user, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}
