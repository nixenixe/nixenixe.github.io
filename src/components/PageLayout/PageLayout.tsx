import * as React from "react";
import {JSX} from "react";
import "./page-layout.less";

interface PageLayoutProps {
    children: JSX.Element;
}

export const PageLayout = ({children}: PageLayoutProps) => {
    return (
        <div className="page-layout">
            {children}
        </div>
    )
}
