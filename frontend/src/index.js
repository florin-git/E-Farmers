// Bootstrap and Style
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./my_css/style.css";
import "./my_css/over_bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { AuthProvider } from "./context/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
