import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosUsers";


import useAuth from "../hooks/useAuth";

function Logout(props) {
  /**
   ** VARIABLES
   */

  // This variable is used for the redirection
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const refreshToken = auth.refreshToken;

  /**
   ** FUNCTIONS
   */
  useEffect(() => {
    axiosInstance.post("logout/blacklist/", {
      refresh_token: refreshToken,
    });

    // Remove JWT tokens and reset user's values
    setAuth({
      userId: null,
      accountType: 0,
      accessToken: null,
      refreshToken: null,
    });

    axiosInstance.defaults.headers["Authorization"] = null;

    navigate("/");
  });

  return <div>Logout</div>;
}

export default Logout;
