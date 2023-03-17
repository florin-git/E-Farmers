import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axiosUsers from "../api/axiosUsers";
import useAuth from "../hooks/useAuth";

function OAuthLogin() {
  // This variable is used for the redirection
  const navigate = useNavigate();
  const location = useLocation();
  // Where you came from when you try to access a "protected" page
  // otherwise the root
  const from = location.state?.from?.pathname || "/";

  // Get the function to update authentication data from context storage
  const { setAuth } = useAuth();

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          axiosUsers
            .post("oauth/token/", {
              access_token: credentialResponse.credential,
            })
            .then((res) => {
              // If the submission was successful
              const accessToken = res.data.access;
              const userId = res.data.id;
							const accountType = res.data.account_type

              // Store only the refresh token in the local storage
              localStorage.setItem("refresh_token", res.data.refresh);

              // Update axiosUsers with the new tokens
              axiosUsers.defaults.headers[
                "Authorization"
              ] = `JWT ${accessToken}`;

              // Set data from backend in the global context
              setAuth({ userId, accountType, accessToken });

              // If no errors
              navigate(from, { replace: true });
							window.location.reload();
            })
            .catch((error) => {
              // Error in fetching the JWT tokens
              console.log(error.response);
              return error.response;
            });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default OAuthLogin;
