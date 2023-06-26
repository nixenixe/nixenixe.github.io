import {createContext, Dispatch, SetStateAction} from "react";

export type ViewType = 'HOME' | 'CALCULATOR';

export interface ViewList {
    [key: string]: ViewType;
}

export interface AppContext {
    view: ViewType;
    setView: Dispatch<SetStateAction<ViewType>>
}

export const views: ViewList = {
    HOME: "HOME",
    CALCULATOR: "CALCULATOR",
};

export const context = createContext<AppContext>({
    view: views.HOME, setView: () => {}
});

export const AppContextProvider = context.Provider;