import React, { type ReactNode } from "react";
import { UserContext, type ProfileInfo } from "./types";

export interface UserInfo {
  id: string;
  email: string;
}

export interface UserContextType {
  user: UserInfo | null | "ERROR";
  profile: ProfileInfo | null | "ERROR";
  getProfileInfo: () => Promise<void>;
}

export const UserProvider: React.FC<{
  children: ReactNode;
  user: UserInfo | null | "ERROR";
  profile: ProfileInfo | null | "ERROR";
  getProfileInfo: () => Promise<void>;
}> = ({ children, user, profile, getProfileInfo }) => {
  const value: UserContextType = {
    user,
    profile,
    getProfileInfo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
