import {Route, Switch} from "react-router-dom";
import {routes} from "./routes";
import {Calculator} from "./scenes/calculator/calculator";
import {Home} from "./scenes/home/home";
import * as React from "react";

export const Router = () => {
    return (
        <Switch>
            <Route path={routes.CALCULATOR}>
                <Calculator />
            </Route>
            <Route path={routes.ROOT}>
                <Home />
            </Route>
        </Switch>
    );
};