import * as React from 'react';
import {useContext} from "react";
import {context} from "../../context";
import "./page-layout.less";
import {menuItems} from "./menuUtils";
import {TbCat} from "react-icons/tb";

export const Menu = () => {
    const {view, setView} = useContext(context);

    return (
        <div className="menu-container">
            <div className="menu-logo">
                <TbCat size="30px" />
                <h2>Nixe.io</h2>
            </div>
            {menuItems.map((i) => {
                return (
                    <div
                        key={i.view}
                        className={`menu-item ${view === i.view ? 'menu-item-selected' : ''}`}
                        onClick={() => setView(i.view)}
                    >
                        {i.icon}
                        {i.title}
                    </div>
                );
            })}
        </div>
    );
}
