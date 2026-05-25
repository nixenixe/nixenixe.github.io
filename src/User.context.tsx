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
  getUserInfo: () => Promise<void>;
}

export const UserProvider: React.FC<{
  children: ReactNode;
  user: UserInfo | null | "ERROR";
  profile: ProfileInfo | null | "ERROR";
  getProfileInfo: () => Promise<void>;
  getUserInfo: () => Promise<void>;
}> = ({ children, user, profile, getProfileInfo, getUserInfo }) => {
  const value: UserContextType = {
    user,
    profile,
    getProfileInfo,
    getUserInfo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
