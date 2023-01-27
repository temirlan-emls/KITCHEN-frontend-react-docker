import App from "./App";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./store/store";
import { SnackbarProvider } from "notistack";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <SnackbarProvider maxSnack={5} autoHideDuration={5000}>
        {" "}
        <Provider store={store}>
            {" "}
            <BrowserRouter>
                {/* <React.StrictMode> */}
                <App />
                {/* </React.StrictMode> */}
            </BrowserRouter>
        </Provider>
    </SnackbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
