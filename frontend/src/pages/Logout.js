import React, { useEffect } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  // This variable is used for the redirection
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.post("logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    navigate("/");
  });

  return <div>Logout</div>;
}

export default Logout;
