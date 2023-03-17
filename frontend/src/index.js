// Bootstrap and Style
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./my_css/style.css";
import "./my_css/over_bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "./context/AuthProvider";
const googleClientId = process.env.REACT_APP_GOOGLE_API_TOKEN;

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
