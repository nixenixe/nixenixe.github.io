import * as React from 'react';
import {TbCat} from "react-icons/tb";
import {HiMenu} from "react-icons/hi";
import {menuItems} from "./menuUtils";
import {useContext, useState} from "react";
import {CgClose} from "react-icons/cg";
import {context, ViewType} from "../../context";
import "./page-layout.less";

export const MobileMenu = () => {
    const [open, toggleOpen] = useState<boolean>(false);
    const {view, setView} = useContext(context);

    const handleClick = (view: ViewType) => {
        toggleOpen(false);
        setView(view);
    };

    return (
        <div className="mobile-menu-component">
            <div className="mobile-menu-top">
                <div className="mobile-menu-logo">
                    <TbCat size="20px" />
                    <h2>Nixe.io</h2>
                </div>
                {open ?
                    <CgClose onClick={() => toggleOpen(false)} size="20px" /> :
                    <HiMenu onClick={() => toggleOpen(true)} size="20px" />}
            </div>
            {open && <div className="mobile-menu-open">
                {menuItems.map((i) => {
                    return (
                        <div
                            key={'mobile-item' + i.view}
                            className={`mobile-menu-item ${view === i.view ? 'mobile-menu-item-selected' : ''}`}
                             onClick={() => handleClick(i.view)}
                        >
                            {i.icon}
                            {i.title}
                        </div>
                    );
                })}
            </div>}
        </div>
    );
}
