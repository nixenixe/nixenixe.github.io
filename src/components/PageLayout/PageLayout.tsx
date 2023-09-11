import * as React from "react";
import {JSX} from "react";
import "./page-layout.less";
import {Menu} from "./Menu";
import {MobileMenu} from "./MobileMenu";

interface PageLayoutProps {
    children: JSX.Element;
}

export const PageLayout = ({children}: PageLayoutProps) => {
    return (
        <div className="page-layout">
            <Menu />
            <MobileMenu />
            <div className="page-layout-content">
                {children}
            </div>
        </div>
    )
}
