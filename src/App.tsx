import * as React from "react";
import {useContext, useState} from "react";
import {AppContextProvider, context, ViewType} from "./context";
import {Calculator} from "./scenes/calculator/calculator";
import "./styling/index.less";
import {JavaZoneCalendar} from "./scenes/javazone/JavaZoneCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {PageLayout} from "./components/PageLayout/PageLayout";

export const App = () => {
    const [view, setView] = useState<ViewType>('CALCULATOR');
    return (
        <AppContextProvider value={{view, setView}}>
            <ViewRouter />
        </AppContextProvider>
    );
};

export const ViewRouter = () => {
    const {view} = useContext(context);

    if (view === 'JAVAZONE') {
        return <PageLayout><JavaZoneCalendar /></PageLayout>;
    }

    return <PageLayout><Calculator /></PageLayout>;
}
