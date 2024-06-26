import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./core/store";

import App from "./App";
import "./style/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import("bootstrap/dist/css/bootstrap.min.css");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
