import { useEffect } from "react";
import axiosInstance from "../api/axiosUsers";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

// This hook attaches the interceptors to the axios instance

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  /**
   * Access denied!: Do nothing because you are trying to access
   * another user info
   *
   * If error 401 && token_not_valid
   *  If refresh token is available
   * 	  Get new access token
   *
   *  Else If refresh token is expired or not valid
   *    Redirected and reset all authentication variables
   */

  useEffect(() => {
    const accessToken = auth?.accessToken;
    axiosInstance.defaults.headers["Authorization"] = `JWT ${accessToken}`;

    // The first request fails and so now we retry
    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;

        if (typeof error.response === "undefined") {
          alert(
            "A server/network error occurred. " +
              "Looks like CORS might be the problem. " +
              "Sorry about this - we will get it fixed shortly."
          );
          return Promise.reject(error);
        }

        // If the token is invalid or expired
        if (
          error.response.data.code === "token_not_valid" &&
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized" &&
          !prevRequest.sent
        ) {
          console.log("Access token expired");
          prevRequest.sent = true;

          const refreshToken = localStorage.getItem("refresh_token");

          if (refreshToken) {
            const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

            // Expiration date in token is expressed in seconds, while now() returns milliseconds:
            const now = Math.ceil(Date.now() / 1000);
            // console.log(tokenParts.exp);

            // If refresh token is not expired
            if (tokenParts.exp > now) {
              // Retrieve a new access token
              return axiosInstance
                .post("token/refresh/", { refresh: refreshToken })
                .then((res) => {
                  const newAccessToken = res.data.access;
                  setAuth((prev) => {
                    // Refresh the access token with the new one
                    return { ...prev, accessToken: newAccessToken };
                  });

                  // Update the refresh token
                  localStorage.setItem("refresh_token", res.data.refresh);

                  prevRequest.headers[
                    "Authorization"
                  ] = `JWT ${newAccessToken}`;

                  return axiosInstance(prevRequest);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log("Refresh token is expired", tokenParts.exp, now);
              alert("Your session has expired. You need to login again.");
              window.location.href = "/login/";
            }
          } else {
            console.log("Refresh token not available.");
            window.location.href = "/";
          }
          
          // If refresh token is expired or null,
          // reset all variables and tokens
          axiosInstance.defaults.headers["Authorization"] = null;
          localStorage.removeItem("refresh_token");
          setAuth({});
          return Promise.reject(error);
        }
      }
    );

    // Clean up function to remove the interceptor
    return () => {
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh, setAuth]);

  return axiosInstance;
};

export default useAxiosPrivate;
