import { createContext } from "react";
import type { UserContextType } from "./User.context";

export type FetchResult<T> = T | "ERROR";

export interface MenuItemData {
    label: string;
    path: string;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
    
export interface ProfileInfo {
    user_id: string;
    name: string;
    updated_at: string;
}