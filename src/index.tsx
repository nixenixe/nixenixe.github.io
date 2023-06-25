import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Routes, Route, Navigate} from "react-router-dom";
import {routes} from "./routes";
import {Home} from "./scenes/home/home";
import {Calculator} from "./scenes/calculator/calculator";
import "./styling/index.less";

const router = createBrowserRouter([
    {
        path: "*",
        Component: Root,
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

function Root() {
    return (
        <Routes>
            <Route path={routes.CALCULATOR} element={<Calculator />} />
            <Route path={routes.ROOT} element={<Home />} />
            <Route path={"*"} element={<Navigate to={routes.ROOT} />} />
        </Routes>
    )
}