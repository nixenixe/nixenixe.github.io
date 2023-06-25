import * as React from "react";
import './home.less';
import {Spacer} from "../../components/Spacer/Spacer";
import {routes} from "../../routes";

export const Home = () => {
    const getMenuItem = (label: string, route: string) => {
        return (
            <div
                className="menu-item"
                onClick={() => window.location.href = route}
            >
                {label}</div>
        );
    }
    return (
        <div className="page-setup welcome-page">
            <h1>Welcome!!</h1>
            <Spacer size="m"/>
            {getMenuItem('Calculator', routes.CALCULATOR)}
        </div>
    );
};