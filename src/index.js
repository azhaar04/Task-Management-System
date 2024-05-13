import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./core/App";
import "bootstrap-icons/font/bootstrap-icons.css";
import("bootstrap/dist/css/bootstrap.min.css");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
