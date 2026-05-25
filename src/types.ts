import { createContext } from "react";
import type { UserContextType } from "./User.context";

export type FetchResult<T> = T | "ERROR";

export type FetchResultWithError<T> = ReturnDatType<T> | ErrorWithData;

type ReturnDatType<T> = {
  type: "DATA";
  data: T;
};

type ErrorWithData = {
  type: "ERROR";
  name: string;
  message: string;
  status: number | undefined;
  code: string | (string & {}) | undefined;
};

export interface MenuItemData {
  label: string;
  path: string;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export interface ProfileInfo {
  user_id: string;
  name: string;
  updated_at: string;
}
