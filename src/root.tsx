import React from "react";
import {createRoot} from "react-dom/client";
import {App} from "./App";

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);

root.render(<App />);