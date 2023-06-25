import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "./routes";
import {Home} from "./scenes/home/home";
import {Calculator} from "./scenes/calculator/calculator";

const router = createBrowserRouter([
    {
        path: routes.ROOT,
        element: <Home/>,
    },
    {
        path: routes.CALCULATOR,
        element: <Calculator/>
    }
]);

const container = document.getElementById('app');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);