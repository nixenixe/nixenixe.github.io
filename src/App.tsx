import * as React from "react";
import {useContext, useState} from "react";
import {AppContextProvider, context, views, ViewType} from "./context";
import {Calculator} from "./scenes/calculator/calculator";
import {Home} from "./scenes/home/home";

export const App = () => {
    const [view, setView] = useState<ViewType>(views.HOME);
    return (
        <AppContextProvider value={{view, setView}}>

        </AppContextProvider>
    )
};

export const ViewRouter = () => {
    const {view} = useContext(context);

    if (view === 'CALCULATOR') {
        return <Calculator/>;
    }

    return <Home/>;
}