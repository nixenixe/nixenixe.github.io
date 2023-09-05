import * as React from "react";
import {useContext, useState} from "react";
import {AppContextProvider, context, views, ViewType} from "./context";
import {Calculator} from "./scenes/calculator/calculator";
import {Home} from "./scenes/home/home";
import "./styling/index.less";
import {JavaZoneCalendar} from "./scenes/javazone/JavaZoneCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {PageLayout} from "./components/PageLayout/PageLayout";

export const App = () => {
    const [view, setView] = useState<ViewType>(views.CALENDAR);
    return (
        <AppContextProvider value={{view, setView}}>
            <ViewRouter />
        </AppContextProvider>
    )
};

export const ViewRouter = () => {
    const {view} = useContext(context);

    if (view === 'CALCULATOR') {
        return <Calculator />;
    }

    if (view === 'CALENDAR') {
        return <PageLayout><JavaZoneCalendar /></PageLayout>;
    }

    return <Home />;
}
