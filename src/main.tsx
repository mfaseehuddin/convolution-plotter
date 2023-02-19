import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/app";

import "./index.css";

//import the appContext to get the sidebaritems and current page
import AppContextProvider from "./app/context/app/appContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </React.StrictMode>
);
