import { ajax } from "./preset";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const themeToken = {
  colorPrimary: "#4F185A",
};

root.render(
    <React.StrictMode>
      <App preset={{ ajax }} themeToken={themeToken} />
    </React.StrictMode>
);
