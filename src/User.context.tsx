import React, { createContext, type ReactNode } from "react";

export interface UserInfo {
  id: string;
  email: string;
}

interface UserContextType {
  user: UserInfo | null | "ERROR";
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null | "ERROR">>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{
  children: ReactNode;
  user: UserInfo | null | "ERROR";
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null | "ERROR">>;
}> = ({ children, user, setUser }) => {
  const value: UserContextType = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
