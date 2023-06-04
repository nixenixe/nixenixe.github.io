import * as React from "react";
import './styling/index.less';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {routes} from "./routes";
import {Home} from "./scenes/home/home";
import {Calculator} from "./scenes/calculator/calculator";


export const App = () => {
    const router = createBrowserRouter([
        {
            path: routes.ROOT,
            element: <Home />,
        },
        {
            path: routes.CALCULATOR,
            element: <Calculator />
        }
    ]);

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
};