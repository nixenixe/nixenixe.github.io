import * as React from "react";
import './home.less';
import {Spacer} from "../../components/Spacer/Spacer";
import {context, views, ViewType} from "../../context";
import {useContext} from "react";

export const Home = () => {
    const {setView} = useContext(context);
    const getMenuItem = (label: string, newView: ViewType) => {
        return (
            <div
                className="menu-item"
                onClick={() => setView(newView)}
            >
                {label}</div>
        );
    }
    return (
        <div className="page-setup welcome-page">
            <h1>Welcome!</h1>
            <Spacer size="m"/>
            {getMenuItem('Calculator', views.CALCULATOR)}
        </div>
    );
};